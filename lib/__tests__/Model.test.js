import Model from '../Model';

describe('Model class', () => {
  it('can pluralize a table name', () => {
    const modelDog = new Model('Dog');
    expect(modelDog.tableName).toEqual('dogs');

    const modelOctopus = new Model('Octopus');
    expect(modelOctopus.tableName).toEqual('octopuses');

    const modelOx = new Model('Ox');
    expect(modelOx.tableName).toEqual('oxen');
  });
});
