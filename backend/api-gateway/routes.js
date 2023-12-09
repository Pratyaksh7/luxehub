const ROUTES = [
    {
        url: '/auth',
        auth: false,
        // rateLimit: {
        //     windowMs: 15 * 60 * 1000,
        //     max: 10
        // },
        proxy: {
            target: "http://localhost:3001",
            changeOrigin: true,
            pathRewrite: {
                [`^/`]: '',
            },
        }
    },
    {
        url: '/products',
        auth: false,
         // rateLimit: {
        //     windowMs: 15 * 60 * 1000,
        //     max: 10
        // },
        proxy: {
            target: "http://localhost:3002",
            changeOrigin: true,
            pathRewrite: {
                ['^/']: '',
            }
        }
    }
    // {
    //     url: '/premium',
    //     auth: true,
    //     creditCheck: true,
    //     proxy: {
    //         target: "https://www.google.com",
    //         changeOrigin: true,
    //         pathRewrite: {
    //             [`^/premium`]: '',
    //         },
    //     }
    // }
]

exports.ROUTES = ROUTES;