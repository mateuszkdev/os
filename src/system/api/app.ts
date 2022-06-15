import ex from 'express';
import es from 'express-session';
import { lang, users } from '../../run';

import conf from '../../config/express';
import ErrorsHandler from "../handlers/Errors";
import AppsHandler from '../handlers/Apps';

/**
 * @name SystemApp
 * @description Class representing System express
 */
export default class SystemApp {

    app: ex.Application;

    /**
     * @description Create SystemApp
     */
    constructor () {

        this.app = ex();

        this.setUp();

    }

    /**
     * @name setUp
     * @description SetUp express usages and setters
     * @returns {void}
     */
     public async setUp (): Promise<void> {

        this.app.set('views', `${__dirname}/../../../gui/structure`);
        this.app.set('view engine', 'pug');

        this.app.use(ex.static(`${__dirname}/../../../gui/view`));
        this.app.use(ex.urlencoded({ extended: false }));
        this.app.use(ex.json());
        this.app.use(es(conf.session));
        this.app.use(new ErrorsHandler().errorsHandler);

        this.app.get('/', (req, res) => res.render('desktop'));
        new AppsHandler(this.app);
        this.app.use(users.handleSession);
        this.setUpUnknwonRoutes();

    }

    /**
     * @name setUpUnknwonRoutes
     * @description Handle unknow routes
     * @returns {*}
     * @private
     */
    private setUpUnknwonRoutes (): void {

        ['get', 'post'].forEach(e => {
             (this.app as any)[e]('*', (req: ex.Request, res: ex.Response) => {

                 const currentLang = lang.get('error', { h4: lang.langs.get(lang.cache.language)?.error.h4s });
                 res.render('error', { ...currentLang });

             });
         });
    }

    /**
     * @name start
     * @description Start express app - needed to handler system pages
     * @returns {Promise<void>} 
     */
    async start (): Promise<void> {
        this.app.listen(conf.port, () => console.info('Starting express'));
    }

}