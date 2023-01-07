const API_KEY = process.env.API_KEY_MAILGUN;
const DOMAIN = process.env.DOMAIN_MAILGUN;

const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);

const client = mailgun.client({ username: 'api', key: API_KEY });

function sendMail(messageData) {
  client.messages
    .create(DOMAIN, messageData)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
}

module.exports = sendMail;
