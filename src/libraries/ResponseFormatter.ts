import { FastifyReply } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import _ = require('lodash');

export default class ResponseFormatter {
  /**
   * Creates an instance of ResponseFormatter.
   * @param {FastifyReply<Server, IncomingMessage, ServerResponse>} httpResponse
   * @param {*} data
   * @memberof ResponseFormatter
   */
  constructor(
    httpResponse: FastifyReply<Server, IncomingMessage, ServerResponse>,
    data: any,
    message?: string,
    status?: string,
  ) {
    httpResponse.code(200).send({
      data: (!_.has(data, 'docs') && { docs: data }) || data,
      status: status ? status : 'ok',
      message: message ? message : '',
    });
    httpResponse.sent = true;
  }
}
