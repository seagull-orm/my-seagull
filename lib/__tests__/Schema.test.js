import Schema from '../Schema';

describe('Schema class', () => {
  it('can SQLize our Schema', () => {
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

    expect(schema.toSQL()).toEqual([
      'name TEXT NOT NULL',
      'age INTEGER NOT NULL',
      'weight TEXT'
    ])
  })
})