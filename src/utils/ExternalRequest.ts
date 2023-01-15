const axios = require('axios');
const servicesUrl = {
  basicinfo: process.env.START_DOMAIN + process.env.BASIC_INFO_SERVICES_URL,
  auth: process.env.START_DOMAIN + process.env.AUTH_SERVICES_URL,
};
axios.defaults.headers.common['Accept-Version'] = '1.0.0';

export const SERVICES = ['basicinfo', 'auth'];
export interface IExternalRequest {
  external_get_req: (
    serviceName: string,
    moduleName: string,
    params: any,
    headers: object,
  ) => Promise<any[]>;
  external_post_req: (
    serviceName: string,
    moduleName: string,
    params: any,
    headers: object,
  ) => Promise<any[]>;
  external_put_req: (
    serviceName: string,
    moduleName: string,
    params: any,
    headers: object,
  ) => Promise<any[]>;
  external_delete_req: (
    serviceName: string,
    moduleName: string,
    params: any,
    headers: object,
  ) => Promise<any[]>;
}

export async function external_get_req(
  serviceName: string,
  moduleName: string,
  params: any,
  headers: object,
) {
  const response = await axios.get(
    `${servicesUrl[serviceName]}${moduleName}/${params ? params : ''}`,
    headers,
  );
  return response['data'];
}

export async function external_post_req(
  serviceName: string,
  moduleName: string,
  params: any,
  headers: object,
) {
  const response = await axios.post(
    `${servicesUrl[serviceName]}${moduleName}`,
    params,
    headers,
  );
  return response['data'];
}

export async function external_put_req(
  serviceName: string,
  moduleName: string,
  params: any,
  headers: object,
) {
  const response = await axios.put(
    `${servicesUrl[serviceName]}${moduleName}`,
    params,
    headers,
  );
  return response['data'];
}

export async function external_delete_req(
  serviceName: string,
  moduleName: string,
  params: any,
  headers: object,
) {
  const response = await axios.delete(
    `${servicesUrl[serviceName]}${moduleName}`,
    params,
    headers,
  );
  return response['data'];
}
