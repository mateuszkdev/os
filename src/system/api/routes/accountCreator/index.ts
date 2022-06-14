import { App } from 'Types/system/api/apps';

import p1 from './pages/p1';
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

        switch (parseInt(req.body.page)) {
            case 1: return p1({ req, res });
            case 2: return p2({ req, res });
        }

    }

} as App