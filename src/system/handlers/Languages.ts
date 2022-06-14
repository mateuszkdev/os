import { cache } from 'Types/system/handlers/languages';
import { ILanguage } from 'Types/system/languages/export';

import en from '../languages/en';

/**
 * @name Languages
 * @description Class representing Languages manager
 */
export default class Languages {

    cache: cache;
    langs: Map<string, ILanguage>;

    /**
     * @description Create Languages manager
     */
    constructor () {

        this.cache = {
            user: 'gues',
            language: 'en',
            region: 'eu'
        }

        this.langs = new Map();

        this.setUpLangs();

    }

    /**
     * @name setUpLangs
     * @description SetUp languages into Map<>
     * @return {*}
     */
    setUpLangs (): void {

        this.langs.set('en', en);

    }

    /**
     * @name setSessionLanguage
     * @description Set up language from user preferences
     * @param {string} username Account name
     * @returns {*}
     */
    set setSessionLanguage (username: string) {

        // @todo - Chose language from user system config
        const lang = 'en';
        const region = 'eu';

        this.cache.language = lang;
        this.cache.region = region;

    }

    /**
     * @name replaceText
     * @description Replace variable in object into custom text
     * @param {any} ob Language object
     * @param {Object} options Data to replace
     * @returns {Object} Replaced object
     */
    replaceText (ob: any, options: any): ILanguage {

        if (!options) return ob;

        Object.keys(options).forEach(key => {

            const regexp = new RegExp(`${ob[key]}`, 'gmi');

            Object.keys(ob).forEach(k => {
                if (!regexp.test(ob[k])) return;
                else {
                    ob[k] = options[k];
                }
            });
        });

        return ob;

    }

    /**
     * @name get
     * @description Get target language object, also you can set custom text
     * @param key
     * @param options
     */
    get (key: any, options?: Object): ILanguage {

        const lang: any = this.langs.get(this.cache.language);
        const ob = lang[key];
        return this.replaceText(ob, options);

    }

}