const createUserSchema = {
  body: {
    type: 'object',
    required: ['name', 'email', 'age'],
    properties: {
      name: { type: 'string' },
      email: { type: 'string', format: 'email' },
      age: { type: 'number' },
    },
  },
};

const updateUserSchema = {
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      email: { type: 'string', format: 'email' },
      age: { type: 'number' },
    },
  },
};

export { createUserSchema, updateUserSchema };
