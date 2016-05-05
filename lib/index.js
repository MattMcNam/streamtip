'use strict';

const EventEmitter = require('events');
const io = require('socket.io-client');
const API = require('./api');

class Streamtip extends EventEmitter {
    constructor(options) {
        super();
        let clientId = options.clientId;
        let accessToken = options.accessToken;
        this.api = new API(clientId, accessToken);

        let socket = io.connect('https://streamtip.com/', {
            multiplex: false,
            query: `client_id=${clientId}&access_token=${accessToken}`
        });

        socket.on('connect', () => this.emit('connected'));
        socket.on('authenticated', () => this.emit('authenticated'));
        socket.on('newTip', tip => this.emit('newTip', tip));
        socket.on('error', err => {
            if (err === '401::Access Denied::') {
                this.emit('authenticationFailed');
            } else if (err === '429::Too Many Requests::') {
                // Too many bad authentications = ratelimited
                this.emit('ratelimited');
            } else if (err.message === 'xhr poll error') {
                // ignoring xhr poll error, socket.io will reconnect
            } else {
                this.emit('error', err);
            }
        });

        this._socket = socket;
    }
}

Streamtip.API = API;
module.exports = Streamtip;
