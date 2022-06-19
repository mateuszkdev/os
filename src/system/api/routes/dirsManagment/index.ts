import { App } from 'Types/system/api/apps';

export default {

    name: '/dirManagment',

    post: async ({ req, res }) => {

        console.table({
            add: req.body.add,
            name: req.body.name,
            parent: req.body.parent
        });

    }

} as App;