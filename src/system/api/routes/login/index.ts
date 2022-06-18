import { App } from 'Types/system/api/apps';
import { users } from '../../../../run';

export default {

    name: '/login',

    get: async ({ res }) => {

        return res.render('creators/account/login/page')

    },

    post: async ({ req, res }) => {

        const username = req.body.username;
        const password = req.body.password;

        if (!await users.checkIsUserExists(username)) return res.render('creators/account/login/page', { error: 'Incorrect username' });

        const passwordCheck = await users.checkUserPassword(username, password);
        if (!passwordCheck) return res.render('creators/account/login/page', { error: 'Incorrect password' });

        req.session.username = username;

    }

} as App