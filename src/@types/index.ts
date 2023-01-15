import { IncomingMessage, Server, ServerResponse } from 'http';
import { FastifyInstance, FastifyRequest as Request } from 'fastify';
import { RouteGenericInterface } from 'fastify/types/route';
import { FastifyReply } from 'fastify/types/reply';
import { IConfig } from '../configs';
import { IDatabase } from '../database';
import { IUtilities } from '../utils';


interface IUserCredentials {
  id: string;
  email: string;
  roles: [];
  permissions: [];
  profiles: string;
  submission: string;
}

export type RouteFactory = (
  app: FastifyInstance,
) => (
  request: Request<RouteGenericInterface, Server, IncomingMessage>,
  reply: FastifyReply<
    Server,
    IncomingMessage,
    ServerResponse,
    RouteGenericInterface
  >,
) => Promise<any>;

declare module 'fastify' {
  export interface FastifyInstance {
    config: IConfig;
    db: IDatabase;
    utils: IUtilities;
  }
}
interface FastifyRequest {
  user: IUserCredentials;
}
