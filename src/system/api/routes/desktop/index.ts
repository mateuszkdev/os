import { App } from 'Types/system/api/apps';
import { lang } from '../../../../run';

export default {

    name: '/',

    get: async ({ res }) => {

        const l = lang.langs.get(lang.cache.language)?.desktop.home;
        return res.render('desktop', { logOut: l?.logout, shutDown: l?.shutdown })

    },


} as App