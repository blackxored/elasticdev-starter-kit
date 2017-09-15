// @flow
import faunadb from '../connectors';

class User {
  constructor(connector: typeof faunadb) {
    this.connector = connector;
  }

  findById(id: string) {
    return this.connector.findById('auth_userId', id);
  }
}

export default User;
