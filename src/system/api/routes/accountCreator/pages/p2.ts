import { AppArgs } from 'Types/system/api/apps';
import { hashSync } from 'bcrypt';

import { users } from '../../../../../run';

export default async ({ req, res }: AppArgs): Promise<void> => {

    const username = req.body.username;
    const password = req.body.password;

    const passwordHash = hashSync(password, 10);

    await users.createUser(username);
    await users.updateUserConfig(username, { password: passwordHash });

    // @todo languge 
    return res.render('creators/account/create/second')

}