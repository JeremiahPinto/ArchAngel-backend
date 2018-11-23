// Initializes the `mailer` service on path `/mailer`
const Mailer = require('feathers-mailer');
const smtpTransport = require('nodemailer-smtp-transport');
const hooks = require('./mailer.hooks');

module.exports = (app) => {
  // Initialize our service with any options it requires
  app.use('/mailer', Mailer(smtpTransport({
    host: process.env.SMTP_SERVER, // need to change later
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })));

  // Get our initialized service so that we can register hooks
  const service = app.service('mailer');

  service.hooks(hooks);
};
