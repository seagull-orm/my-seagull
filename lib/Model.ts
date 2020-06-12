import * as pluralize from 'pluralize';
import Schema from './Schema';
import client from './Client';

export default class Model {
  tableName: string;
  schema: Schema;
  constructor(name: string, schema: Schema) {
    this.tableName = pluralize(name).toLowerCase();
    this.schema = schema;
  }

  init() {
    const schemaFields = this.schema.toSQL().join(', ')
    return client.query(`CREATE TABLE ${this.tableName}(${schemaFields});`)
  }

  insert(object) {
    const valuesString = Object.keys(object).map((_, i) => `$${i + 1}`).join(', ')
    return client.query(
      `INSERT INTO ${this.tableName}(${Object.keys(object).join(', ')}) VALUES(${valuesString})`,
      Object.values(object)
    );
  };
}
