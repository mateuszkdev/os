import { App } from 'Types/system/api/apps';
import { lang } from '../../../../run';

export default {

    name: '/',

    get: async ({ res }) => {

        // @todo Apps import from handler Map<>
        const appImage = 'assets/images/desktop/defaultFile.png';
        const apps = [
            {
                appName: 'settings', appImage, appEndpoint: '/settings'
            },
            {
                appName: 'calc', appImage, appEndpoint: '/calc'
            }
        ];

        // @todo Dirs manager / handler
        const dirImage = 'assets/images/desktop/defaultDir.png';
        const dirs = [
            {
                dirName: 'photos', dirImage, dirEndpoint: '/desktop/photos'
            },
            {
                dirName: 'texts', dirImage, dirEndpoint: '/desktop/texts'
            }
        ];

        const l = lang.langs.get(lang.cache.language)?.desktop.home;
        return res.render('desktop', { logOut: l?.logout, shutDown: l?.shutdown, apps, dirs })

    },


} as App