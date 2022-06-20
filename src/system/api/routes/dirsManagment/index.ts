import { App } from 'Types/system/api/apps';
import { dirs, lang } from '../../../../run';

export default {

    name: '/dirManagment',

    post: async ({ req, res }) => {

        let response: unknown = null;

        const parent = req.body.parent;
        switch (req.body.type) {

            case 'dir':
                response = await dirs.mkDir(parent, req.body.name);
                console.log(response);
                break;

            case 'file':
                response = await dirs.createFile(parent, req.body.name);
                console.log(response);
                break;

        }

        const dirData = await dirs.getDirData(parent);
        // console.log(dirData)
        const l = lang.langs.get(lang.cache.language)?.desktop.home;
        return res.render('desktopDir', { logOut: l?.logout, shutDown: l?.shutdown, dirData, path: parent });

    }

} as App;