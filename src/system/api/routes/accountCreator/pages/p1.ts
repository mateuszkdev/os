import { AppArgs } from 'Types/system/api/apps';
import { lang } from '../../../../../run';

export default async ({ req, res }: AppArgs): Promise<void> => {

    lang.setSessionLanguage = req.body.chooseLanguage;

    const languge = lang.langs.get(lang.cache.language)?.accountCreator.p2;
    return res.render('creators/account/create/second', languge);

}