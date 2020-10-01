const okta = require('@okta/okta-sdk-nodejs');

const client = new okta.Client({
  orgUrl: 'https://dev-221342.okta.com',
  token: '00agEhS_OyLKD7ay3GqSSvghnmQ6pLvO1vcgq_2Gns',
  pcke: false,
  cookies: {
   secure: false
  }
});

module.exports = client;
