import * as jwt from 'jsonwebtoken';
import { ObjectId } from 'mongoose';
import { configs } from '../configs';
/**
 * Payload expected by JWT's sign token function.
 *
 * @interface IJWTPayload
 */
export interface IJWTPayload {
  email: string;
  roles: [string];
  permissions: [string];
  profiles:ObjectId;
  _id: ObjectId;
}

export interface IJWTToken {
  sign: (options: IJWTPayload) => string;
  verify: (token: string) => IJWTPayload;
}

/**
 * JWT tokens signing, verification and decoding utility.
 *
 * @export
 * @class Token
 */
export const JWTToken = {
  /**
   * Use JWT to sign a token
   */
  sign: (options: IJWTPayload) => {
    const {
      email,
      roles,
      permissions,
      profiles,
      _id
    }: IJWTPayload = options;
    if (!email || !roles || !permissions || !profiles || !_id ) {
      throw new Error('Expects email,roles and permissions in payload.');
    }

    return jwt.sign(
      { email, roles, permissions,profiles,_id },
      configs.jwtsecret,
      {
        expiresIn: '7d',
      },
    );
  },
  /**
   * Verify token, and get passed in variables
   */
  verify: (token: string) => {
    try {
      return jwt.verify(token, configs.jwtsecret) as IJWTPayload;
    } catch (error) {
      return {
        email: null,
        roles: [],
        permissions: [],
        profiles : null,
        _id : null
      };
    }
  },
};
