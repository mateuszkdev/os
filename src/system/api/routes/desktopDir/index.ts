import { App } from 'Types/system/api/apps';
import { lang, dirs } from '../../../../run';

export default {

    name: '/dir',

    get: async ({ res, req }) => {

        const dirName = req.body.dirName;
        console.log(dirName)
        const dirData = await dirs.getDirData(dirName);

        const l = lang.langs.get(lang.cache.language)?.desktop.home;
        return res.render('desktopDir', { logOut: l?.logout, shutDown: l?.shutdown, dirData, dirName });

    },


} as App