import { readdirSync } from 'fs';
import { Application } from 'express';

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

    }

    /**
     * @name setUp
     * @description set up routes from apps and sys apps
     */
    public async setUp (): Promise<void> {

        Object.values(this.dirs).forEach(directory => {

            readdirSync(directory).forEach(dir => {

                readdirSync(dir)
                    .filter(f => f.endsWith('.js') && new RegExp(`index`, 'gmi').test(f))
                    .forEach(file => {

                        // @todo Type of app route
                        const app = require(`${directory}/${dir}/${file}`).default;

                        if (app.get) {
                            this.app.get(app.name, (req, res) => app.get.run(req, res));
                        }

                        if (app.post) {
                            this.app.post(app.name, (req, res) => app.post.run(req, res));
                        }

                    });

            });

        });

    }

}