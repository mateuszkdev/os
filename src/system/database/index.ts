import { connect } from 'mongoose';

const connectionUrl: string= 'mongodb://127.0.0.1:27017/os1';

/**
 * @name run
 * @description Connect database
 * @returns {Promise<void>}
 */
const run = async (): Promise<void> => {

    const res = await connect(connectionUrl);

    if (res instanceof Error) throw res;
    console.log(`Database loaded.`);

}

run().catch(e => console.error(e));

// models export
import { users } from './models/Users.model';

export const db = { users };