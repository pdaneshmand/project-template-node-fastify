import * as _ from "lodash";

export interface IUserCheck {
  accountType: (roles: object) => Promise<any[]>;
  isMainRole: (roles: []) => Promise<any[]>;
}

export async function accountType(roles: any) {

}

export async function isMainRole(roles: any) {

}
