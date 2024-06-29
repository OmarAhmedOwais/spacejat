const messageDefinition = {
  type: 'object',
  required: ['message', 'title', 'sender', 'receiver'],
  properties: {
    _id: {
      type: 'number',
      format: 'uuid',
    },
    message: {
      type: 'string',
    },
    title: {
      type: 'string',
    },
    sender: {
      type: 'string',
    },
    receiver: {
      type: 'string',
    },
  },
};

export { messageDefinition };
