import { Client } from 'pg';

export const client = new Client({
    connectionString: 'postgres://fxrtybdrskoyqu:b77425e111726b4134913d6bff97a6f5b88e97e73bdbe52cb9d2e7d10e670e23@ec2-3-231-16-122.compute-1.amazonaws.com:5432/dac97o2f57eqg2'
})