import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import {
  protectAuthorizedUser,
  protectUserRoute,
} from '../../middlewares/Authentication';
import Util from '../../controllers/Util';

export default (
  app: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void,
) => {
  app.get(
    '/getDateTime',
    {
      constraints: { version: '1.0.0' },
    },
    async (request, reply) =>
      await new Util(app, request, reply, 'Util').getDateTime(),
  );

  // pass execution to the next middleware
  next();
};

exports.autoPrefix = '/util';
