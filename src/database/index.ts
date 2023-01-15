import { FastifyInstance } from "fastify";
import * as fp from "fastify-plugin";
import { IncomingMessage, Server, ServerResponse } from "http";
import * as mongoose from "mongoose";
import { Model } from "mongoose";
import logger from "../libraries/Logger";
import {
  FeedbackType,
  IFeedbackTypeDocument,
} from "../models/FeedbackTypes";
/**
 * Database Entities
 * * This section is very important
 * * All entity from your database define in this section
 * * With mongoose you can implement CRUD operation
 * * All models and schema integrate with together in this section
 */
export interface IDatabase {
  FeedbackType: Model<IFeedbackTypeDocument>;
}

const models: IDatabase = {
  FeedbackType,
};

export default fp.default(
  async (
    app: FastifyInstance<Server, IncomingMessage, ServerResponse>,
    opts: {},
    done: (err?: Error) => void
  ) => {
    mongoose.connection.on("connected", () =>
      logger.success({}, "Mongo connected successfully", "", "CONSOLE")
    );
    mongoose.connection.on("error", (error) => {
      logger.error(error, error.message, "", "CONSOLE");
    });
    await mongoose.createConnection(app.config.mongouri).asPromise();
    await mongoose.connect(app.config.mongouri);
    app.decorate("db", models);
    done();
  }
);
