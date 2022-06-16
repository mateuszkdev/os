import { App } from 'Types/system/api/apps';
import { users } from '../../../../run';

export default {

    name: '/login',

    get: async ({ res, req }) => {

        req.session.destroy();
        return res.redirect('/login');

    },


} as App