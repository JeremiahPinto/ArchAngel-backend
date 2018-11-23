// Initializes the `auth_management` service on path `/auth-management`
const authManagement = require('feathers-authentication-management');
const hooks = require('./auth_management.hooks');
const notifier = require('./notifier');

module.exports = (app) => {
  // Initialize our service with any options it requires
  app.configure(authManagement(notifier(app)));

  // Get our initialized service so that we can register hooks
  const service = app.service('authManagement');

  service.hooks(hooks);
};
