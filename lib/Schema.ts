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
}