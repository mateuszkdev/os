import { model, Schema } from 'mongoose';
import { IDir } from 'Types/system/database/models/Dirs';

export const dirs = model<IDir>('Dirs', new Schema({

    name: {
        type: String, required: true
    },
    parent: {
        type: String, required: true
    },
    icon: {
        type: String, required: true
    },
    type: {
        type: String, required: true
    },
    path: {
        type: String, required: true
    }

}));