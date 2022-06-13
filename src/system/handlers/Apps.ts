import { readdirSync, existsSync } from 'fs';
import { Application } from 'express';
import { App } from 'Types/system/api/apps';

/**
 * @name Apps
 * @description Create Apps handler, includes system apps ( from another directory )
 */
export default class Apps {

    dirs: {
        sys: string
        apps: string
    }

    /**
     * @description Create Apps
     * @param {Application} app - Express application
     */
    constructor (private app: Application) {

        this.dirs = {
            sys: `${__dirname}/../api/routes`,
            apps: `${__dirname}/../../apps`
        }

        this.setUp();

    }

    /**
     * @name setUp
     * @description set up routes from apps and sys apps
     */
    public async setUp (): Promise<void> {

        console.log(`== Loading applications ==`);

        Object.values(this.dirs).forEach(directory => {

            console.log(`Scaning ${directory.slice(30)}..`);

            readdirSync(directory).forEach(dir => {

                if (!existsSync(`${directory}/${dir}`)) {
                    console.log(`Found: 0 apps`)
                    return;
                }

                console.log(`→ Found: ${dir}`);

                readdirSync(`${directory}/${dir}`)
                    .filter(f => f.endsWith('.js') && new RegExp(`index`, 'gmi').test(f))
                    .forEach(file => {

                        const app: App = require(`${directory}/${dir}/${file}`).default;

                        if (!app || !app.name) {
                            console.log(`App dont have name: disabled`);
                            return;
                        }

                        console.log(`• • Loaded ${app.name}`);

                        if (app.get) {
                            this.app.get(app.name, (req, res) => app.get!({ req, res }))
                            console.log(`• • • [GET]`);
                        }

                        if (app.post) {
                            this.app.post(app.name, (req, res) => app.post!({ req, res }));
                            console.log(`• • • [POST]`);
                        }

                    });

            });

        });

    }

}