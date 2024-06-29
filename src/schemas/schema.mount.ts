import { userDefinition } from './user/user.definition';

import { messageDefinition } from './message/message.definition';

const swaggerDefinitions = {
  User: userDefinition,
  Message: messageDefinition,
};

export { swaggerDefinitions };
