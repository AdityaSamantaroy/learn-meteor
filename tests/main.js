/* eslint-disable no-undef */
import assert from 'assert';
import '../imports/api/tasks.test';

describe('simple-todos', () => {
  it('package.json has correct name', async () => {
    const { name } = await import('../package.json');
    assert.strictEqual(name, 'simple-todos');
  });

  if (Meteor.isClient) {
    it('client is not server', () => {
      assert.strictEqual(Meteor.isServer, false);
    });
  }

  if (Meteor.isServer) {
    it('server is not client', () => {
      assert.strictEqual(Meteor.isClient, false);
    });
  }
});
