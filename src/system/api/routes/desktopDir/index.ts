import { App } from 'Types/system/api/apps';
import { lang } from '../../../../run';

export default {

    name: '/dir',

    get: async ({ res, req }) => {

        const dirName = req.body.dirName;

        // @todo Dir files manager
        const dirFiles = [
            {
                name: 'test1',
                icon: 'assets/images/desktop/defaultFile.png'
            },
            {
                name: 'test2',
                icon: 'assets/images/desktop/defaultDir.png'
            }
        ];

        const l = lang.langs.get(lang.cache.language)?.desktop.home;
        return res.render('desktopDir', { logOut: l?.logout, shutDown: l?.shutdown, dirFiles, dirName });

    },


} as App