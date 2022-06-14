import { App } from 'Types/system/api/apps';

import p2 from './pages/p2';

/**
 * createAccount
 */
export default {

    name: '/createAccount',

    get: async ({ res }) => {

        return res.render('creators/account/create/first');

    },

    post: async ({ req, res }) => {

        switch (req.body.page) {
            case 2: return p2({ req, res });
        }

    }

} as App