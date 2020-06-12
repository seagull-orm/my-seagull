import Schema from './Schema';
import pluralize from 'pluralize';

export default class Model {
  tableName: string;
  schema: Schema;
  constructor(name: string, schema: Schema){
    this.tableName = pluralize(name).toLowerCase();
    this.schema = schema;
  }

  init(){
    const schemaFields = this.schema.toSQL()
    .join(', ')

    return `CREATE TABLE ${this.tableName}(${schemaFields});`
  }
}

//CREATE TABLE account(	user_id serial PRIMARY KEY,	username VARCHAR (50) UNIQUE NOT NULL,password VARCHAR (50) NOT NULL,	email VARCHAR (355) UNIQUE NOT NULL,	created_on TIMESTAMP NOT NULL,	last_login TIMESTAMP);

// add a .init() method that creates a table