interface SchemaConfigurationValue {
    type: string, // TODO: use enum for type based on postgres types
    required?: boolean
};

interface SchemaConfiguration {
    [field: string]: SchemaConfigurationValue
};

export default class Schema {
    schemaConfiguration: SchemaConfiguration;
    constructor(schemaConfiguration: SchemaConfiguration) {
        this.schemaConfiguration = schemaConfiguration;
    }

    toSQL(){
        // [[key, value], [key2, value2]]
        return Object.entries(this.schemaConfiguration).map(([field: string, {type, required}]) => {
            return `${field} ${type} ${required ? 'NOT NULL' : ''}`;
        });
    }
}


// {
//     name: {
//         type: Text,
//         required: true
//     }
// }