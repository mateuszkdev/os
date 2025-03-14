import { ILanguage } from 'Types/system/languages/export';

export default {

    error: {
        h1: 'NIE blue screen',
        h2: 'Napotkano błąd',
        h4: '{{errorOccurred}}',
        h4s: 'Coś poszło nie tak. Spróbuj zrestartować system'
    },

    desktop: {
        home: {
            logout: 'Wyloguj',
            shutdown: 'Wyłącz'
        }
    },

    accountCreator: {
        p2: {
            header: 'Nazwa & Hasło',
            description: 'Podaj nazwę użytkownika i hasło ( możesz też klinkąć przycisk poniżej aby konto nie miało hasła ).',
            input1: 'Nazwa użytkownika',
            input2: 'Hasło'
        },
        p3: {
            textHello: 'Witaj!',
            textWelcome: 'Zapraszam..',
            textUsername: '{{username}}'
        }
    }

} as ILanguage