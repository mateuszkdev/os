import { App } from 'Types/system/api/apps';

export default {

    name: '/createAccount',

    get: async ({ res }) => {

        return res.render('creators/account/create/first');

    },

    // post: async ({}) => {}

} as App