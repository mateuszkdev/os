import { ILanguage } from 'Types/system/languages/export';

export default {

    error: {
        h1: 'NOT a blue screen',
        h2: 'An error occurred',
        h4: '{{errorOccurred}}',
        h4s: 'Somethink went wrong. Try restart system.'
    },

    accountCreator: {
        p2: {
            header: 'Name & Password',
            description: 'Enter your username and set your password ( you can also click ckechbox below to no-password account ).',
            input1: 'Username',
            input2: 'Password'
        },
        p3: {
            textHello: 'Hello!',
            textWelcome: 'Welcome..',
            textUsername: '{{username}}'
        }
    }

} as ILanguage