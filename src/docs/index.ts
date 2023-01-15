import { FastifyInstance } from 'fastify';
import * as fp from 'fastify-plugin';
import { PluginOptions } from 'fastify-plugin';
import { IncomingMessage, Server, ServerResponse } from 'http';

/**
 * API Docs
 * * This section is very important
 * * You can manaage swagger for API Docs
 * * API Docs means, How your API works ?
 * * You can see your inputs and outputs of API
 */
export default fp.default((app: FastifyInstance<Server, IncomingMessage, ServerResponse>, opts: PluginOptions, done: (err?: Error) => void) => {
    app.register(require('@fastify/swagger'), {
        routePrefix: '/docs',
        swagger: {
            info: {
                title: 'Tesr API Server Docs',
                description: 'Responds to paths prefixed with either `api` or `auth`, other requests will be forwarded to UI router.',
                version: '0.0.1',
            },
            externalDocs: {
                url: 'Tesr API Server Docs',
                description: `Hosted on high speed delivery server.`,
            },
            consumes: ['application/json'],
            produces: ['application/json'],
            tags: [
                {
                    name: 'auth',
                    description: 'Authentication related endpoints',
                },
                {
                    name: 'api',
                    description: 'Data related endpoints',
                },
            ],
            securityDefinitions: {
                apiKey: {
                    description: 'Standard Authorization header using the Bearer scheme. Example: "Bearer {token}"',
                    type: 'apiKey',
                    name: 'Authorization',
                    in: 'header',
                },
            },
        },
        exposeRoute: true,
    });

    done();
});
