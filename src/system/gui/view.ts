const { spawn } = require('webview');
import exConf from '../../config/express';

/**
 * @name Gui
 * @description Class representing System Gui Window
 */
export default class Gui {

    /**
     * @description Create Gui window
     */
    constructor () {

        spawn({
            title: 'OS',
            width: 1280,
            height: 720,
            url: `http://127.0.0.1:${exConf.port}/`,
            cwd: process.cwd()
        });

    }

}