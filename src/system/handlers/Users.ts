import { IUser } from 'Types/system/database/models/Users';
import { db } from '../../run';
import { Request, Response, NextFunction } from 'express';
import { compareSync } from 'bcrypt';

/**
 * User default config
 */
export const defaultUserConfig: IUser = {
    username: '',
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
    public async checkIsUserExists (username: string): Promise<boolean> {
        const d = await db.users.findOne({ username });
        if (d?.username) return true;
        else return false;
    }

    /**
     * @name createUser
     * @description Create new user directory and setUp default config - user will change config in next account creator steps
     * @param {string} username Name of user account
     * @returns {boolean} Method returns true if directory create successfull
     */
    public async createUser (username: string): Promise<boolean> {

        if (await this.checkIsUserExists(username)) return false;

        const data: IUser = defaultUserConfig;
        data.username = username;
        data.password = '';

        const res = await db.users.insertMany([data]);

        if (res instanceof Error) return false;
        else return true;
    }

    /**
     * @name deleteUser
     * @description Delete user ( perm ) - this method will remove user directory - all system configs
     * @param username Name of account to delete
     * @returns {boolean} Returns true if success
     */
    public async deleteUser (username: string): Promise<boolean> {

        if (!await db.users.findOne({ username })) return false;
        else {
            await db.users.deleteOne({ username });
            return true;
        }

    }

    /**
     * @name updateUserConfig
     * @description Update user system config
     * @param {string} username Name of account
     * @param {IdefaultUserConfig} newConfig User config object
     * @returns {boolean}
     */
    public async updateUserConfig (username: string, newConfig: IUser): Promise<boolean> {

        if (!await db.users.findOne({ username })) return false;

        await db.users.updateOne({ username }, newConfig);
        return true

    }

    /**
     * @name setUserPassowrd
     * @description Set password to user. param password with 0 letters string equals to non-password account ( just return )
     * @param {string} username Name of account to password setup
     * @param {string} password Password Has
     * @returns {boolean}
     */
    public async setUserPassowrd (username: string, password: string): Promise<boolean> {

        if (!await this.checkIsUserExists(username)) return false;

        await db.users.updateOne({ username }, { password });
        return true;

    }

    /**
     * @name checkSession
     * @description Check session
     * @param  {Request} req Express request
     * @returns {Promise<boolean>} If session is, returns true else, return false
     * @private
     */
    static checkSession (req: Request | any): boolean {

        if (!req.session || !req.session.username) return false;
        else return true;

    }

    /**
     * @name handleSession
     * @description Handle user session
     * @param {Request} req Express request
     * @param {Response} res Express response
     * @param {NextFunction} next Express next function
     * @returns {*}
     */
    public async handleSession (req: Request | any, res: Response, next: NextFunction): Promise<void> {

        if (!Users.checkSession(req)) return res.redirect('/login');
        else return next();

    }

    /**
     * @name checkUserPassword
     * @description Check user password by compare input hash and user db password
     * @param {String} username name of account to check
     * @param {String} password password from input
     * @returns {Promise<boolean>} If account correct method will return true
     */
    public async checkUserPassword (username: string, password: string): Promise<boolean> {

        const userData = await db.users.findOne({ username });
        const comapred = compareSync(password, (userData?.password as any));

        if (comapred) return true;
        else return false;

    }

}