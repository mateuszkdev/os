import { existsSync, mkdirSync, rmdirSync, createWriteStream } from 'fs';
import { inspect } from 'util';

/**
 * User default config
 */
export const defaultUserConfig = {
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

}