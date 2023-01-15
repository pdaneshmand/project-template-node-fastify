import { FastifyInstance } from "fastify";
import * as fp from "fastify-plugin";
import { IEmail, sendEmail } from "../libraries/Email";
import { IStatusCodesInterface, statuscodes } from "./Statuscodes";
import { IJWTToken, JWTToken } from "./Token";
import { IResolveLocals, resolve } from "./Resolvelocals";
import { IPaginate, paginate } from "./Paginate";
import { compareObjects, IObjectdiff } from "./Objectdiff";
import { ICsvparser, csvParse } from "./Csvparser";
import { ISheetbuilder, buildSheet } from "./Sheetbuilder";
import { ICompileTemplate, compileEjs } from "./Template";
import { IUploader, uploader, extractFilepath } from "./Uploader";
import { IQueryGenerator, findQueryGenerator } from "./QueryGenerator";
import { IUserCheck, accountType, isMainRole } from "./CheckUser";
import {
  IExternalRequest,
  external_get_req,
  external_post_req,
  external_put_req,
  external_delete_req,
  SERVICES,
} from "./ExternalRequest";
// tslint:disable-next-line: no-empty-interface
export interface IUtilities
  extends IStatusCodesInterface,
    IResolveLocals,
    IJWTToken,
    IEmail,
    IPaginate,
    IObjectdiff,
    ICsvparser,
    ISheetbuilder,
    ICompileTemplate,
    IQueryGenerator,
    IUserCheck,
    IExternalRequest,
    IUploader {}

export default fp.default(
  (app: FastifyInstance, opts: {}, done: (err?: Error) => void) => {
    app.decorate("utils", {
      statuscodes,
      resolve,
      ...JWTToken,
      sendEmail,
      paginate,
      compareObjects,
      csvParse,
      buildSheet,
      compileEjs,
      uploader,
      extractFilepath,
      findQueryGenerator,
      external_get_req,
      external_post_req,
      external_put_req,
      external_delete_req,
      SERVICES,
      accountType,
      isMainRole,
    });
    // pass execution to the next middleware in fastify instance
    done();
  }
);
