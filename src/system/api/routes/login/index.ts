import { App } from 'Types/system/api/apps';
import { users } from '../../../../run';

export default {

    name: '/login',

    get: async ({ res }) => {

        return res.render('creators/account/login/page')

    },

    post: async ({ req, res }) => {

        setTimeout(async () => {

            const username = req.body.username;
            const password = req.body.password;

            // @todo custom language
            if (!await users.checkIsUserExists(username)) return res.render('creators/account/login/page', { error: 'Incorrect username' });

            const passwordCheck = await users.checkUserPassword(username, password);

            // @todo custom language
            if (!passwordCheck) return res.render('creators/account/login/page', { error: 'Incorrect password' });

        }, 1000);

    }

} as App