import * as pluralize from 'pluralize';
import { Schema } from './Schema';
import { client } from './Client';

export class Model {
  tableName: string;
  schema: Schema;
  constructor(name: string, schema: Schema) {
    this.tableName = pluralize(name).toLowerCase();
    this.schema = schema;
  }

  init(): object {
    const schemaFields = this.schema.toSQL().join(', ')
    return client.query(`CREATE TABLE ${this.tableName}(id SERIAL NOT NULL, ${schemaFields});`)
  }

  insert(input): object {
    if (Array.isArray(input)) {
      return Promise.all(input.map(object => {
        const valuesString = Object.keys(object).map((_, i) => `$${i + 1}`).join(', ')
        return client.query(
          `INSERT INTO ${this.tableName}(${Object.keys(object).join(', ')}) VALUES(${valuesString})`,
          Object.values(object)
        );
      }))
    } else {
      const valuesString = Object.keys(input).map((_, i) => `$${i + 1}`).join(', ')
        return client.query(
          `INSERT INTO ${this.tableName}(${Object.keys(input).join(', ')}) VALUES(${valuesString})`,
          Object.values(input)
        );
    }
  };

  findById(id): [object] {
    return client.query(
      `SELECT * FROM ${this.tableName} WHERE id=$1`,
      [id]
    ).then(item => item.rows)
  }

  find(object): [object] {
    return object 
      ? client.query(
        `SELECT * FROM ${this.tableName} WHERE ${Object.keys(object)[0]} = $1;`,
        Object.values(object))
        .then(item => item.rows)
      :
      client.query(`SELECT * FROM ${this.tableName}`)
      .then(item => item.rows)
  }

  findByIdAndUpdate(id, object): [object] {
    const updateString = Object.keys(object).map((field, i) => `${field}=$${i+1}`)
    .join(', ')

    return client.query(
      `UPDATE ${this.tableName} SET ${updateString} WHERE id=$${Object.keys(object).length+1} RETURNING *`,
      [...Object.values(object), id]
    ).then(item => item.rows)
  }

  findByIdAndDelete(id): [object] {
    return client.query(
      `DELETE FROM ${this.tableName} WHERE id=$1 RETURNING *`,
      [id]
    ).then(item => item.rows)
  }
}
