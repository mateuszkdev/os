/**
 * Imports
 */
import SystemApp from './system/api/app';
import Gui from './system/gui/view';
import Languages from './system/handlers/Languages';
import Users from './system/handlers/Users';

export default class Os {

    static async start (): Promise<void> {

        await new SystemApp().start();
        new Gui();

    }

}

export const lang = new Languages();
export const users = new Users();
Os.start();
