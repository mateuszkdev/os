import { App } from 'Types/system/api/apps';

export default {

    name: '/calc',

    get: async ({ res }) => {

        res.end('ok');

    }

} as App;