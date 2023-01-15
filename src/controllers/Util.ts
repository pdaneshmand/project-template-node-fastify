import Controller from '../utils/Controller';
import * as _ from 'lodash';
const date = require('date-and-time');

export default class Util extends Controller {
  public async getDateTime(): Promise<any> {
    const pattern = date.compile('dddd, MMMM DD YYYY HH:mm:ss [GMT]Z');
    const now = new Date();
    let dates = {
      short: date.format(now, 'YYYY/MM/DD HH:mm:ss'),
      long: date.format(now, 'ddd, MMM DD YYYY HH:mm:ss'),
      complete: date.format(now, pattern),
    };

    return {
      error: '',
      message: 'ok',
      data: dates,
    };
  }

  public async detectAccountType(roles: string[]): Promise<any> {
    if (roles.map((t) => t.toLowerCase()).indexOf('superadmin') !== -1) {
      return 'superadmin';
    } else if (roles.map((t) => t.toLowerCase()).indexOf('agent') !== -1) {
      return 'agent';
    } else if (roles.map((t) => t.toLowerCase()).indexOf('client') !== -1) {
      return 'client';
    } else return 'user';
  }
}
