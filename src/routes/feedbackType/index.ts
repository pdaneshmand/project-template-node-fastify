import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import {
  protectAuthorizedUser,
  protectUserRoute,
} from '../../middlewares/Authentication';
import FeedbackTypeController from '../../controllers/FeedbackType';
import ResponseFormatter from '../../libraries/ResponseFormatter';

//You can use request['user'] for access to user information
//You can log request['user']

export default (
  app: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void,
) => {
  app.post(
    '/search',
    {
      preHandler: async (request, reply) =>
        protectAuthorizedUser(
          app,
          request,
          reply,
          [],
          ['softwareusagepermission'],
          (done) => {},
        ),
      constraints: { version: '1.0.0' },
      config: {
        rateLimit: {
          max: 10,
          timeWindow: '1 minute',
        },
      },
    },

    async (request, reply) => {
      let obj: any = request.body;
      const query = await app.utils.findQueryGenerator(
        obj['fields'],
        obj['condition'],
      );
      new ResponseFormatter(
        reply,
        await new FeedbackTypeController(
          app,
          request,
          reply,
          'FeedbackType',
        ).find(query),
      );
    },
  );

  app.get(
    '/:page/:limit',
    {
      constraints: { version: '1.0.0' },
      config: {
        rateLimit: {
          max: 10,
          timeWindow: '1 minute',
        },
      },
    },
    async (request, reply) => {
      const options = {
        page: request.params['page'],
        limit: request.params['limit'],
        pagination:
          request.params['page'] === '0' && request.params['limit'] === '0'
            ? false
            : true,
        collation: {
          locale: 'en',
        },
      };
      new ResponseFormatter(
        reply,
        await app.db['FeedbackType']['paginate']({}, options),
      );
    },
  );

  app.get(
    '/:id',
    {
      constraints: { version: '1.0.0' },
      config: {
        rateLimit: {
          max: 10,
          timeWindow: '1 minute',
        },
      },
    },
    async (request, reply) => {
      new ResponseFormatter(
        reply,
        await new FeedbackTypeController(
          app,
          request,
          reply,
          'FeedbackType',
        ).findById(request.params['id']),
      );
    },
  );

  app.get(
    '/code/:code',
    {
      preHandler: async (request, reply) =>
        protectAuthorizedUser(
          app,
          request,
          reply,
          [],
          ['softwareusagepermission'],
          (done) => {},
        ),
      constraints: { version: '1.0.0' },
      config: {
        rateLimit: {
          max: 10,
          timeWindow: '1 minute',
        },
      },
    },
    async (request, reply) => {
      new ResponseFormatter(
        reply,
        await new FeedbackTypeController(
          app,
          request,
          reply,
          'FeedbackType',
        ).findOne({ code: request.params['code'] }),
      );
    },
  );

  app.post(
    '',
    {
      preHandler: async (request, reply) =>
        protectAuthorizedUser(
          app,
          request,
          reply,
          [],
          ['softwareusagepermission'],
          (done) => {},
        ),
      constraints: { version: '1.0.0' },
      config: {
        rateLimit: {
          max: 10,
          timeWindow: '1 minute',
        },
      },
    },
    async (request, reply) => {
      new ResponseFormatter(
        reply,
        await new FeedbackTypeController(
          app,
          request,
          reply,
          'FeedbackType',
        ).create(),
      );
    },
  );

  app.put(
    '',
    {
      preHandler: async (request, reply) =>
        protectAuthorizedUser(
          app,
          request,
          reply,
          [],
          ['softwareusagepermission'],
          (done) => {},
        ),
      constraints: { version: '1.0.0' },
      config: {
        rateLimit: {
          max: 10,
          timeWindow: '1 minute',
        },
      },
    },
    async (request, reply) => {
      new ResponseFormatter(
        reply,
        await new FeedbackTypeController(
          app,
          request,
          reply,
          'FeedbackType',
        ).findByIdAndUpdate(request.body['_id'], request.body, {}),
      );
    },
  );

  app.delete(
    '',
    {
      preHandler: async (request, reply) =>
        protectAuthorizedUser(
          app,
          request,
          reply,
          [],
          ['softwareusagepermission'],
          (done) => {},
        ),
      constraints: { version: '1.0.0' },
      config: {
        rateLimit: {
          max: 10,
          timeWindow: '1 minute',
        },
      },
    },
    async (request, reply) => {
      new ResponseFormatter(
        reply,
        await new FeedbackTypeController(
          app,
          request,
          reply,
          'FeedbackType',
        ).findByIdAndDelete(request.body['_id']),
      );
    },
  );
  next();
};

exports.autoPrefix = '/feedbacktype';
