import { type } from 'Types/system/handlers/dirs';
import { IDir } from 'Types/system/database/models/Dirs';
import { db } from '../../run';

/**
 * @name Dirs
 * @description Class representing Directorys and files
 */
export default class Dirs {

    accessableTypes: type[];
    replaceReg: RegExp;

    /**
     * Create class
     */
    constructor () {

        this.accessableTypes = ['file', 'dir'];
        this.replaceReg = new RegExp('/', 'gmi');

    }

    /**
     * @name mkDir
     * @description Create directory
     * @param {string} path Dir location
     * @param {string} name Dir name
     * @returns {Promise<string>}
     */
    public async mkDir (path: string, name: string): Promise<string> {

        name = name.replace(this.replaceReg, '_');

        const paths = path.trim().split(this.replaceReg);
        const newDirData: IDir = { parent: '', name: '', icon: 'assets/images/desktop/defaultDir.png', type: 'dir', path: '' };

        if (paths.length > 1 && !await db.dirs.findOne({ path })) return 'Unknown path';
        newDirData.parent = path;

        const familyDrama = await db.dirs.findOne({ parent: newDirData.parent, name, type: 'dir' });
        if (familyDrama?.name) return `Directory "${name}" is already created in this path.`

        newDirData.name = name;
        newDirData.path = `${path}/${name}`;

        await db.dirs.insertMany([newDirData]);
        return `Dir ${newDirData.path} created successfull`;

    }

    /**
     * @name rmDir
     * @description Remove dir and all iteams inside (perm)
     * @param {string} path Dir location
     * @returns {Promise<string>}
     */
    public async rmDir (path: string): Promise<string> {

        const paths = path.trim().split(this.replaceReg);

        for (let p in paths) {
            if (!await db.dirs.findOne({ name: p })) return 'Unknow path';
        }

        await db.dirs.deleteOne({ path });
        await db.dirs.deleteMany({ parent: path });

        return `Directory ${path} has ben successfull removed with all data inside.`

    }

    /**
     * @name getDirData
     * @description Get dir data ( another dirs and files etc )
     * @param {string} path Directory location
     * @returns {Promise<IDir[]>} Array of dirs / files
     */
    public async getDirData (path: string): Promise<IDir[]> {

        const response = await db.dirs.find({ parent: path });
        return response;

    }

    /**
     * @name createFile
     * @description Create new file
     * @param {string} path File location
     * @param {string} name File name with extension
     * @returns {Promise<string>}
     */
    public async createFile (path: string, name: string): Promise<string> {

        name = name.replace(this.replaceReg, '_');

        const newFileData: IDir = { parent: '', name: '', icon: 'assets/images/desktop/defaultFile.png', type: 'file', path: '' };
        const paths = path.trim().split(this.replaceReg);

        if (paths.length > 1 && !await db.dirs.findOne({ path })) return 'Unknow path.';

        const familyDrama = await db.dirs.findOne({ parent: path, name: name, type: 'file' });
        if (familyDrama?.name) return `File "${name}" is already created in this directory.`;

        newFileData.name = name;
        newFileData.path = `${path}/${name}`;
        newFileData.parent = path;

        await db.dirs.insertMany([newFileData]);
        return `File ${newFileData.path} created successfull`;

    }

}