import ex from 'express';
import es from 'express-session';
import { lang } from '../../run';

import conf from '../../config/express';
import ErrorsHandler from "../handlers/Errors";
import AppsHandler from '../handlers/Apps';

// @todo - Delete this line
import { users } from '../../run';

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

        // tests @todo - remove tests when "test" handling available
        this.app.get('/', (req, res) => res.render('desktop'));
        // this.app.get('/test', async (req, res) => {
        //     const _ = await users.createUser('Mateusz');
        //     if (_ instanceof Error) {
        //         new ErrorsHandler().critical(res, _);
        //
        //     }
        //     else return console.log('User created');
        // });

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

        await new AppsHandler(this.app);

        const currentLang = lang.get('error', { h4: lang.langs.get('en')?.error.h4s });
        this.app.get('*', (req, res) => res.render('error', { ...currentLang }));
        this.app.post('*', (req, res) => res.render('error', { ...currentLang }));

        // @todo - session ( user logged ) handler

    }

    /**
     * @name start
     * @description Start express app - needed to handler system pages
     * @returns {Promise<void>} 
     */
    async start (): Promise<void> {

        //@todo - Loading screen information
        this.app.listen(conf.port, () => console.info('Starting express'));

    }

}