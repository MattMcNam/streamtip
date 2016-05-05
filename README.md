# streamtip
A Node.JS wrapper for the [Streamtip](https://streamtip.com/) API.

### Installation
```
npm install streamtip
```

### Usage
```javascript
const StreamTip = require('streamtip');

let opts = {
  clientId: '12345', // Your Client ID, from the Streamtip account page
  accessToken: '67890' // Account Token, again from the account page
};

let streamtip = new Streamtip(opts);

streamtip.on('connected', () => {
  // Successfully connected to Streamtip, but not authenticated yet!
  console.log('connected!');
});

streamtip.on('authenticated', () => {
  // Now authenticated, we can expect tip alerts to come through
  console.log('authenticated!');
});

streamtip.on('authenticationFailed', () => {
  // ClientID or Access Token was rejected
  console.log('authentication failed!');
});

streamtip.on('ratelimited', () => {
  // Too many bad authentications = ratelimited
  console.log('rate limited!');
});

streamtip.on('newTip', tip => {
  // We got a new tip.
  // 'tip' is an object which matches the description given on the Streamtip API page
  console.log(`new tip! ${tip.username} has tipped ${tip.currencySymbol}${tip.amount}!`);
});

streamtip.on('error', err => {
  // An unexpected error occurred
  console.log(`error! ${err.message}`);
});
```

### Contributing
1. Fork the project
2. Create your feature/fix on a new branch
3. Create a new pull request pointing to that branch

### License
'streamtip', this project, is copyright (c) Matthew McNamara and provided under the MIT license, which is available to read in the [LICENSE][] file.
[license]: LICENSE

Streamtip itself, at streamtip.com, is copyright (c) NightDev, LLC.
