import  * as bcrypt from 'bcryptjs'

export default class Bcrypt {
  public static async hashSync(
    plainPassword: string,
    saltRounds: number = 10,
  ): Promise<string> {
    try {
      const hash = await bcrypt.hashSync(plainPassword, saltRounds);
      return hash;
    } catch (error) {
      return 'error';
    }
  }

  public static async compareSync(
    plainPassword: string,
    hash: string,
  ): Promise<boolean> {
    try {
      const compareResult = await bcrypt.compareSync(plainPassword, hash);
      return compareResult;
    } catch (error) {
      return false;
    }
  }
}
