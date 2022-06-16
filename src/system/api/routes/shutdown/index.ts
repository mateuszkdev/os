import { App } from 'Types/system/api/apps';

export default {

    name: '/shutdown',

    get: ({}) => {

        process.exit();
        return

    },

    post: ({}) => {
        // some code
    }

} as App