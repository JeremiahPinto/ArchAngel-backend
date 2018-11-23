const log = require('../../logger');
// const logo = require('./logo');

module.exports = (app) => {
  function getLink(type, hash) {
    const url = `http://localhost:3030/${type}?token=${hash}`;
    return url;
  }

  function sendEmail(email) {
    return app.service('mailer')
      .create(email)
      .then((result) => {
        log('Sent email', result);
      }).catch((err) => {
        log('Error sending email', err);
      });
  }

  return {
    // eslint-disable-next-line
    notifier(type, user, notifierOptions) {
      let tokenLink;
      let email;
      switch (type) {
      case 'resendVerifySignup': // sending the user the verification email
        tokenLink = getLink('verify', user.verifyToken);
        email = {
          from: process.env.SMTP_USER,
          to: user.email,
          subject: 'Invite to Arch Angel',
          html: `
          <p>
          You have been invited to join ${user.company} on Arch Angel.
          Click on the link below to complete the registration process:
          </p>
          <br>
          ${tokenLink}
          `,
        };
        return sendEmail(email);

      case 'verifySignup': // confirming verification
        tokenLink = getLink('verify', user.verifyToken);
        email = {
          from: process.env.SMTP_USER,
          to: user.email,
          subject: 'Confirm Signup',
          html: 'Thanks for verifying your email',
        };
        return sendEmail(email);

      case 'sendResetPwd':
        tokenLink = getLink('reset', user.resetToken);
        email = {
          from: process.env.SMTP_USER,
          to: user.email,
          subject: 'Confirm Signup',
          html: 'Thanks for verifying your email',
        };
        return sendEmail(email);

      case 'resetPwd':
        tokenLink = getLink('reset', user.resetToken);
        email = {
          from: process.env.SMTP_USER,
          to: user.email,
          subject: 'Confirm Signup',
          html: 'Your password has been reset.',
        };
        return sendEmail(email);

      case 'passwordChange':
        email = {
          from: process.env.SMTP_USER,
          to: user.email,
          subject: 'Confirm Signup',
          html: 'Thanks for verifying your email',
        };
        return sendEmail(email);

      case 'identityChange':
        tokenLink = getLink('verifyChanges', user.verifyToken);
        email = {
          from: process.env.SMTP_USER,
          to: user.email,
          subject: 'Confirm Signup',
          html: 'Thanks for verifying your email',
        };
        return sendEmail(email);

      default:
        break;
      }
    },
  };
};
