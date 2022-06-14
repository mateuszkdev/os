import { AppArgs } from 'Types/system/api/apps';
import { lang } from '../../../../../run';

export default async ({ req, res }: AppArgs): Promise<void> => {

    req.session.language = req.body.chooseLanguage.slice(0, 2).toLowerCase();

    const languge = lang.langs.get(req.session.language)?.accountCreator.p2;
    return res.render('creators/account/create/second', languge);

}