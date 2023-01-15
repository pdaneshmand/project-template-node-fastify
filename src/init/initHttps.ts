import * as fastify from 'fastify';
import cluster from 'cluster';
import * as os from 'os';
import {
  Http2SecureServer,
  Http2ServerRequest,
  Http2ServerResponse,
} from 'http2';
import CustomPlugins from '../configs/securePlugins';
import CustomHooks from '../configs/secureHooks';
import { join, resolve } from 'path';
import logger from '../libraries/Logger';
const settings = require(join(__dirname, '..', '..', 'settings.json'));
const fs = require('fs');
const path = require('path');
const ops = require('ops-error');

ops.config({
  useDebug: true,
  useErrorResponse: true,
  useLogging: (log) => {
    logger.error(
      log,
      `Internal Server Error - ${log.statusCode} :`,
      '',
      'CONSOLE',
    );
    ops.print(log);
    // saveLogErrorAsString(JSON.stringify(log));
  },
});

export default class InitHttps {
  public appHttps: fastify.FastifyInstance<
    Http2SecureServer,
    Http2ServerRequest,
    Http2ServerResponse
  >;
  private port: any;

  //Please set your certificate files ( key.pem and cert.pem) in certs folder
  constructor() {
    this.folderCreateCheck();
    this.port = parseInt(process.env.PORT);
    this.appHttps = fastify.fastify({
      http2: true,
      https: {
        allowHTTP1: true,
        key: fs.readFileSync(path.join(path.resolve('./certs/key.pem'))),
        cert: fs.readFileSync(path.join(path.resolve('./certs/cert.pem'))),
      },
      caseSensitive: false,
      ignoreTrailingSlash: true,
      logger: {
        level: 'debug',
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
          }
        },
        serializers: {
          res(reply) {
            // The default
            return {
              statusCode: reply.statusCode,
            };
          },
          req(request) {
            return {
              method: request.method,
              url: request.url,
              path: request.url,
              parameters: request.routerPath,
              headers: request.headers,
            };
          },
        },
      },
    });
    this.config();
  }

  public async start() {
    settings.scale && cluster.isPrimary
      ? await this.workerProcesses()
      : await this.startListening();

    logger.success(
      {},
      'Server listening on port' +
        ' ' +
        JSON.stringify(this.appHttps.server.address()),
      '',
      'CONSOLE',
    );
  }

  private async startListening() {
    return await this.appHttps
      .listen({ port: this.port, host: '0.0.0.0' })
      .catch((error) => {
        logger.error(error, error.message, '', 'CONSOLE');
      });
  }

  private config() {
    this.errorHandler();
    new CustomHooks(this.appHttps);
    new CustomPlugins(this.appHttps);
  }

  private errorHandler() {
    process.on('uncaughtException', (error) => {
      logger.error(error, error.message, '', 'CONSOLE');
    });
    process.on('unhandledRejection', (reason, promise) => {
      logger.error(
        {},
        'Unhandled Rejection at:' +
          ' ' +
          JSON.stringify(promise) +
          ' ' +
          'reason:' +
          JSON.stringify(promise),
        '',
        'CONSOLE',
      );
    });

    this.appHttps.setErrorHandler(async (error, request, reply) => {
      const data = ops.getError(error, request);
      return reply.code(data.statusCode).send(data);
    });
  }

  private folderCreateCheck() {
    if (!fs.existsSync(path.join(path.resolve('./'), process.env.UPLOAD_URL))) {
      const dir1 = './uploads/ticketAttachments';
      const dir2 = './uploads/userProfile';
      const dir3 = './uploads/other';

      fs.mkdirSync(dir1, { recursive: true });
      fs.mkdirSync(dir2, { recursive: true });
      fs.mkdirSync(dir3, { recursive: true });
      logger.info({}, 'Uploads directory fully created.', '', 'CONSOLE');
    }
  }

  private async workerProcesses() {
    const cpus = os.cpus();

    for (const _cpu in cpus) {
      cluster.fork();
    }

    cluster.on('exit', async (_worker) => {
      cluster.fork();
    });
  }
}
