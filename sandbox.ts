import Schema from './lib/Schema';
import Model from './lib/Model';
import client from './lib/Client';

client.connect();

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

const Dog = new Model('Dog', schema);
Dog.init()
  .then(console.log);

