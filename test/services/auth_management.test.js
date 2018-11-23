const assert = require('assert');
const app = require('../../src/app');

describe('\'auth_management\' service', () => {
  it('registered the service', () => {
    const service = app.service('authManagement');

    assert.ok(service, 'Registered the service');
  });
});
