import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { determineAccountAndUser } from '../middlewares/Authentication';
/**
 * Controller utility, with abstract methods, to allow child classes to inherit,
 *  - Fastify instance,
 *  - Incoming request body,
 *  - Incoming request object, and
 *  - Outgoing response object
 *
 * @export
 * @abstract
 * @class Controller
 */
 export default abstract class Controller {
  /**
   * Fastify application instance
   *
   * @protected
   * @type {FastifyInstance<Server, IncomingMessage, ServerResponse>}
   * @memberof Controller
   */
  protected app: FastifyInstance<Server, IncomingMessage, ServerResponse>;

  /**
   * Incoming request body object
   *
   * @protected
   * @type {{}}
   * @memberof Controller
   */
  protected body: any;

  /**
   * Incoming request object
   *
   * @protected
   * @type {FastifyRequest<{}>}
   * @memberof Controller
   */
  protected request: FastifyRequest<{}>;

  /**
   * Outgoing response object
   *
   * @protected
   * @type {FastifyReply<{}>}
   * @memberof Controller
   */
  protected reply: FastifyReply<any>;

  /**
   * Currently logged in user
   *
   * @protected
   * @type {{ email: string; id: Types.ObjectId; account: string }}
   * @memberof Controller
   */

  protected user: object;

  /**
   * db Models
   *
   * @protected
   * @memberof Controller
   */
  protected dbModel: string;

  constructor(
    app: FastifyInstance<Server, IncomingMessage, ServerResponse>,
    request: FastifyRequest<{}>,
    reply: FastifyReply<any>,
    dbModel: string
  ) {
    this.app = app;
    this.body = request.body;
    this.request = request;
    this.reply = reply;
    this.dbModel = dbModel;

    this.user = determineAccountAndUser(app, request);
  }

  public async find(query): Promise<any> {
    const users = await this.app.db[this.dbModel].find(query);
    return users;
  }

  public async findByPaginate(query, options): Promise<any> {
    const defaultOptions = {
      page: 1,
      limit: 10,
      collation: {
        locale: "en",
      },
    };
    const results = await this.app.db[this.dbModel]["paginate"](
      query,
      options ?? defaultOptions
    );
    return results;
  }

  public async findById(id: string): Promise<any> {
    const users = await this.app.db[this.dbModel].findById({ _id: id });
    return users;
  }

  public async findByIdAndDelete(id: string): Promise<any> {
    return this.app.db[this.dbModel].findByIdAndDelete(id);
  }

  public async findByIdAndRemove(id: string): Promise<any> {
    return this.app.db[this.dbModel].findByIdAndRemove(id);
  }

  public async findByIdAndUpdate(
    id: string,
    model: any,
    option: any
  ): Promise<any> {
    return this.app.db[this.dbModel].findByIdAndUpdate(id, model, option);
  }

  public async findOne(query: object): Promise<any> {
    return this.app.db[this.dbModel].findOne(query);
  }

  public async findOneAndDelete(inputData?: any): Promise<any> {
    return this.app.db[this.dbModel].findOneAndDelete(
      inputData ? inputData : this.request.body
    );
  }

  public async findOneAndRemove(inputData?: any): Promise<any> {
    return this.app.db[this.dbModel].findOneAndRemove(
      inputData ? inputData : this.request.body
    );
  }

  public async findOneAndReplace(inputData?: any): Promise<any> {
    return this.app.db[this.dbModel].findOneAndReplace(
      inputData ? inputData : this.request.body
    );
  }

  public async findOneAndUpdate(inputData?: any): Promise<any> {
    return this.app.db[this.dbModel].findOneAndUpdate(
      inputData ? inputData : this.request.body
    );
  }

  public async replaceOne(inputData?: any): Promise<any> {
    return this.app.db[this.dbModel].replaceOne(
      inputData ? inputData : this.request.body
    );
  }

  public async updateMany(inputData?: any): Promise<any> {
    return this.app.db[this.dbModel].updateMany(
      inputData ? inputData : this.request.body
    );
  }

  public async updateOne(inputData?: any): Promise<any> {
    return this.app.db[this.dbModel].updateOne(
      inputData ? inputData : this.request.body
    );
  }

  public async create(inputData?: any): Promise<any> {
    const result = await this.app.db[this.dbModel].create(
      inputData ? inputData : this.request.body
    );
    return result;
  }
}
