const userDefinition = {
  type: 'object',
  required: ['_id', 'email'],
  properties: {
    _id: {
      type: 'number',
      format: 'uuid',
    },
    name: {
      type: 'string',
    },
    email: {
      type: 'string',
      format: 'email',
    },
    age: {
      type: 'number',
    },
  },
};

export { userDefinition };
