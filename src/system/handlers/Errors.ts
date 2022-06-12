import { NextFunction, Response, Request } from 'express';

import { lang } from '../../run';

/**
 * @name ErrorsHandler
 * @description Handle erros in system and show in special page
 */
export default class ErrorsHandler {

    /**
     * @name critical
     * @description Render critical error page
     * @param {Response} res Express response
     * @param {*} e An occurred error
     */
    critical (res: Response, e: any): void {
        const currentLang = lang.get('error', { h4: e });
        res.render('error', { ...currentLang });
    }

    /**
     * @name errorsHandler
     * @description Handle errors
     * @param {*} err An occurred error
     * @param {Request} req Express request
     * @param {Response} res Express response
     * @param {NextFunction} next Express next function
     */
    errorsHandler (err: any, req: Request, res: Response, next: NextFunction): void {

        if (res.headersSent || !req.xhr) {
            return next(err);
        }

        const currentLang = lang.get('error', { h4: err });

        res.status(500);
        res.render('error', { ...currentLang });

    }

}