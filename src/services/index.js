const users = require('./users/users.service.js');
const projects = require('./projects/projects.service.js');
const mailer = require('./mailer/mailer.service.js');
const authManagement = require('./auth_management/auth_management.service.js');
const forms = require('./forms/forms.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = (app) => {
  app.configure(users);
  app.configure(projects);
  app.configure(mailer);
  app.configure(authManagement);
  app.configure(forms);
};
