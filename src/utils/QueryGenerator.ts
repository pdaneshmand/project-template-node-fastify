export interface IQueryGenerator {
  findQueryGenerator: (params: object, condition: string) => Promise<any[]>;
}

export async function findQueryGenerator(params: any, condition: string) {
  condition = condition.toLowerCase();
  let query = {};
  let obj: any = params;
  let queryFields = [];
  for (let key in obj) {
    params[key] !== ''
      ? (query[key] = { $regex: '^((?!string).)*$', $options: params[key] })
      : null;
    console.log('params[key] ', params[key]);
  }
  Object.keys(query).forEach((key) => {
    queryFields.push({ [key]: query[key] });
    console.log('queryFields ', queryFields);
  });

  return condition === 'or' ? { $or: queryFields } : { $and: queryFields };
}
