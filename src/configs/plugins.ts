import * as fastify from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import logger from '../libraries/Logger';
import fileUpload from '@fastify/multipart'
import * as cors from '@fastify/cors';
import viewengine from '@fastify/view';
import utilities from '../utils';
import docs from '../docs';
import database from '../database';
import config from '../configs';
import autoload from '../utils/Autoload';
import { join, resolve } from 'path';
import * as ejs from 'ejs';
import * as moment from 'moment';
import { URL } from 'url';
export default class CustomPlugins {
  public app: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse>;

  constructor(
    apps: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse>,
  ) {
    this.app = apps;

    this.app.register(cors.default, {
      preflight: true,
      credentials: true,
    });

    this.app.addContentTypeParser(
      'multipart/form-data',
      function (request, payload, done) {
        done(null, payload);
      },
    );
    this.app.register(require('@fastify/compress'), {
      global: true,
      requestEncodings: ['gzip', 'deflate'],
      onUnsupportedRequestEncoding: (request, encoding) => {
        return {
          statusCode: 415,
          code: 'UNSUPPORTED',
          error: 'Unsupported Media Type',
          message: 'We do not support the ' + encoding + ' encoding.',
        };
      },
      onInvalidRequestPayload: (request, encoding, error) => {
        return {
          statusCode: 400,
          code: 'BAD_REQUEST',
          error: 'Bad Request',
          message:
            'This is not a valid ' +
            encoding +
            ' encoded payload: ' +
            error.message,
        };
      },
    });
    this.app.register(fileUpload, {
      limits: { fileSize: 50 * 1024 * 1024 },
    });
    this.app.register(config);
    this.app.register(utilities);
    this.app.register(database);
    this.app.register(docs);

    // register routes
    this.app.register(autoload, {
      dir: join(__dirname, '..', 'routes'),
      // includeTypeScript: true,
    });

    this.app.register(viewengine, {
      engine: { ejs },
      templates: join(__dirname, '..', '..', 'views'),
      options: {
        filename: resolve(__dirname, '..', '..', 'views'),
      },
      includeViewExtension: true,
      defaultContext: {
        moment,
        viewsRoot: join(__dirname, '..', '..', 'views/'),
      },
    });

    /**
     * API calling rate limit config
     * ? In this point, You can config api lock for how many times calling in 1 minute
     */
    this.app.register(require('@fastify/rate-limit'), {
      global: true, // default true
      max: 1000, // default 1000
      ban: 500, // default null
      timeWindow: 60000, // default 1000 * 60
      cache: 10000, // default 5000
      // allowList: ['127.0.0.1'], // default []
      // redis: new Redis({ host: '127.0.0.1' }), // default null
      skipOnError: false, // default false
      //keyGenerator: function(req) { /* ... */ }, // default (req) => req.raw.ip
      errorResponseBuilder: function (request, context) {
        logger.error(
          {},
          `API too many request error : ${context.max} requests per ${context.after} to this Website. Try again soon.Request Info : ${request.ip}}`,
        );
        return {
          code: 429,
          error: `Too Many Requests, We only allow ${context.max} requests per ${context.after} to this Website. Try again soon.`,
          message: 'nok',
          data: `We only allow ${context.max} requests per ${context.after} to this Website. Try again soon.`,
          date: Date.now(),
          expiresIn: context.ttl, // milliseconds
        };
      },
      enableDraftSpec: true, // default false. Uses IEFT draft header standard
      addHeadersOnExceeding: {
        // default show all the response headers when rate limit is not reached
        'x-ratelimit-limit': true,
        'x-ratelimit-remaining': true,
        'x-ratelimit-reset': true,
      },
      addHeaders: {
        // default show all the response headers when rate limit is reached
        'x-ratelimit-limit': true,
        'x-ratelimit-remaining': true,
        'x-ratelimit-reset': true,
        'retry-after': true,
      },
    });
  }
}
