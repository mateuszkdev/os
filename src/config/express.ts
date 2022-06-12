export default {
    port: 3040,
    session: {

        secret: 'hgkubt87btt87TB87bt87BT87BkykgGhGKBGKHgbkHkhbg',
        cookie: {
            httpOnly: false,
            secure: false,
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
        },
        saveUninitialized: false,
        resave: true

    }
}