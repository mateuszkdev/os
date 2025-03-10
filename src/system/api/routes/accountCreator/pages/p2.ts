import { AppArgs } from 'Types/system/api/apps';
import { hashSync } from 'bcrypt';

import { users } from '../../../../../run';
import { lang } from '../../../../../run';

export default async ({ req, res }: AppArgs): Promise<void> => {

    const username = req.body.username;
    const password = req.body.password;
    const language = lang.cache.language;

    const passwordHash = hashSync(password, 10);
    await users.createUser(username);
    await users.updateUserConfig(username, { password: passwordHash, language });

    const l: any = lang.replaceText(lang.langs.get(language)?.accountCreator.p3, { textUsername: username });
    return res.render('creators/account/create/three', { texts: l });

}