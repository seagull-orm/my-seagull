import Model from '../Model';
import Schema from '../Schema';

describe('Model class', () => {
  it('can pluralize a table name', () => {
    const modelDog = new Model('Dog');
    expect(modelDog.tableName).toEqual('dogs');

    const modelOctopus = new Model('Octopus');
    expect(modelOctopus.tableName).toEqual('octopuses');

    const modelOx = new Model('Ox');
    expect(modelOx.tableName).toEqual('oxen');
  });

  it('has a schema', () => {
    const schema = new Schema({
      name: {
        type: 'TEXT',
        required: true
      },
      age: {
        type: 'INTEGER',
        required: true
      },
      weight: {
        type: 'TEXT'
      }
    });

    const model = new Model('Dog', schema);

    expect (model.schema).toEqual(schema);
  });

  it('can create a table', () => {
    const schema = new Schema({
      name: {
        type: 'TEXT',
        required: true
      },
      age: {
        type: 'INTEGER',
        required: true
      },
      weight: {
        type: 'TEXT'
      }
    });

    const model = new Model('Dog', schema);

    expect (model.init()).toEqual('CREATE TABLE dogs(name TEXT NOT NULL, age INTEGER NOT NULL, weight TEXT);');
  });
});
