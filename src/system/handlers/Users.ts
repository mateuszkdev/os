import { existsSync, mkdirSync, rmdirSync, createWriteStream } from 'fs';
import { inspect } from 'util';

import { IdefaultUserConfig } from 'Types/system/handlers/users';

/**
 * User default config
 */
export const defaultUserConfig: IdefaultUserConfig = {
    language: 'en',
    region: 'eu',
    fontSize: 24,
    wallpaper: 'default1.png', // for now user can choose wallpapers from default directory, user cant set own
    clockType: '24h', // 12h available to
    avatar: 'default1.png', // for now user can choose avatar from default directory, user cant set own
    password: '' // default no password, user can set password in account creator or everytime in profile settings
}

/**
 * @name Users
 * @description Class representing Users
 */
export default class Users {

    public usersDir: string;

    /**
     * @description Create Users manager
     */
    constructor () {

        this.usersDir = `${__dirname}/../../../src/users`;

    }

    /**
     * @name checkIsUserExists
     * @description Check is user exists
     * @param {string} username
     * @returns {boolean} If users exists method will return true, if no - false
     */
    public checkIsUserExists (username: string): boolean {
        return existsSync(`${this.usersDir}/${username}`);
    }

    /**
     * @name createUser
     * @description Create new user directory and setUp default config - user will change config in next account creator steps
     * @param {string} username Name of user account
     * @returns {boolean} Method returns true if directory create successfull
     */
    public async createUser (username: string): Promise<boolean | unknown> {

        try {

            const dir = `${this.usersDir}/${username}`;

            if (!existsSync(dir)) {

                await mkdirSync(dir, { recursive: true });
                const s = await createWriteStream(`${dir}/sysConf.ts`);
                s.write(`export default ${inspect(defaultUserConfig, { depth: 0 })}`);
                await s.close();
                return true;

            }

        } catch (e) {
            return e;
        }

    }

    /**
     * @name deleteUser
     * @description Delete user ( perm ) - this method will remove user directory - all system configs
     * @param username Name of account to delete
     * @returns {boolean} Returns true if success
     */
    public async deleteUser (username: string): Promise<boolean> {

        try {
            await rmdirSync(`${this.usersDir}/${username}`);
            return true;
        } catch (e) {
            return false;
        }

    }

    /**
     * @name getUserConfig
     * @description Get user sysConfig - this method dont check is user exists
     * @param {string} username name of account
     * @returns {IdefaultUserConfig} User config
     */
    public async getUserConfig (username: string): Promise<IdefaultUserConfig> {

        const conf: IdefaultUserConfig = require(`${this.usersDir}/${username}/sysConf.ts`);
        return conf;

    }

    /**
     * @name updateUserConfig
     * @description Update user system config
     * @param {string} username Name of account
     * @param {IdefaultUserConfig} newConfig User config object
     * @returns {boolean}
     */
    public async updateUserConfig (username: string, newConfig: IdefaultUserConfig): Promise<boolean> {

        try {

            if (!this.checkIsUserExists(username)) return false;
            else {

                const conf = await this.getUserConfig(username);

                Object.keys(newConfig).forEach(key => {
                    (conf as any)[key] = (newConfig as any)[key];
                })

                const s = await createWriteStream(`${this.usersDir}/${username}/sysConf.ts`);
                s.write(`export default ${inspect(conf, { depth: 0 })}`);
                await s.close();

                return true;

            }

        } catch (e) {
            return false;
        }

    }

    /**
     * @name setUserPassowrd
     * @description Set password to user. param password with 0 letters string equals to non-password account ( just return )
     * @param {string} username Name of account to password setup
     * @param {string} password Password Has
     * @returns {boolean}
     */
    public async setUserPassowrd (username: string, password: string): Promise<boolean> {

        if (!this.checkIsUserExists(username)) return false;

        const conf = await this.getUserConfig(username);
        conf.password = password;

        await this.updateUserConfig(username, conf);

        return true;

    }

}