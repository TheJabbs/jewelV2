import * as bycrypt from 'bcryptjs';

export class HashingFunctions {
    static  async  hashPassword(password: string): Promise<string> {
        const saltRounds = 10;

        return await bycrypt.hash(password, saltRounds);
    }

    static async comparePassword(password: string, hash: string): Promise<boolean> {
        return await bycrypt.compare(password, hash);
    }
}