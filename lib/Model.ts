import Schema from './Schema';
import pluralize from 'pluralize';

export default class Model {
  tableName: string;
  constructor(name: string, schema: Schema){
    this.tableName = pluralize(name).toLowerCase();
    
  }
}