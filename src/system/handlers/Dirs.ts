import { type } from 'Types/system/handlers/dirs';
import { IDir } from 'Types/system/database/models/Dirs';
import { db } from '../../run';

/**
 * @name Dirs
 * @description Class representing Directorys and files
 */
export default class Dirs {

    accessableTypes: type[];

    /**
     * Create class
     */
    constructor () {

        this.accessableTypes = ['file', 'dir'];

    }

    /**
     * @name mkDir
     * @description Create directory
     * @param {string} path Dir location
     * @param {string} name Dir name
     * @returns {Promise<string>}
     */
    public async mkDir (path: string, name: string): Promise<string> {

        const paths = path.trim().split(new RegExp('/', 'gmi'));

        const newDirData: IDir = { parent: '', name: '', icon: 'assets/images/desktop/defaultDir.png', type: 'dir' };

        for (let p in paths) {
            if (!await db.dirs.findOne({ name: p })) return 'Unknow path';
        }

        newDirData.parent = paths[path.length];

        const familyDrama = await db.dirs.findOne({ parent: newDirData.parent, name });
        if (familyDrama?.name) return `Directory "${name}" is already created in this path.`

        newDirData.name = name;

        await db.dirs.insertMany([newDirData]);
        return `Dir ${path} created successfull`;

    }

    /**
     * @name rmDir
     * @description Remove dir and all iteams inside (perm)
     * @param {string} path Dir location
     * @returns {Promise<string>}
     */
    public async rmDir (path: string): Promise<string> {

        const paths = path.trim().split(new RegExp('/', 'gmi'));

        for (let p in paths) {
            if (!await db.dirs.findOne({ name: p })) return 'Unknow path';
        }

        const name = paths[path.length];

        await db.dirs.deleteOne({ name });
        await db.dirs.deleteMany({ parent: name });

        return `Directory ${path} has ben successfull removed with all data inside.`

    }

}