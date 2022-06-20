import { App } from 'Types/system/api/apps';
import { lang, dirs } from '../../../../run';

export default {

    name: '/dir',

    post: async ({ res, req }) => {

        const path = req.body.path;
        const dirData = await dirs.getDirData(path);

        const l = lang.langs.get(lang.cache.language)?.desktop.home;
        return res.render('desktopDir', { logOut: l?.logout, shutDown: l?.shutdown, dirData, path });

    },


} as App