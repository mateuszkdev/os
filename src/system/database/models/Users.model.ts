import { model, Schema } from 'mongoose';
import { IUser } from 'Types/system/database/models/Users';

export const users = model<IUser>('Users', new Schema({

    username: {
        type: String, required: true, unique: true
    },
    password: {
        type: String
    },
    language: {
        type: String, required: true
    },
    region: {
        type: String, required: true
    },
    fontSize: {
        type: Number, required: true
    },
    wallpaper: {
        type: String, required: true
    },
    clockType: {
        type: String, required: true
    },
    avatar: {
        type: String, required: true
    }

}));