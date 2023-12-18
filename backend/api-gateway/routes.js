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
    },
    {
        url: '/carts',
        auth: false,
         // rateLimit: {
        //     windowMs: 15 * 60 * 1000,
        //     max: 10
        // },
        proxy: {
            target: "http://localhost:3003",
            changeOrigin: true,
            pathRewrite: {
                ['^/']: '',
            }
        }
    },
    {
        url: '/orders',
        auth: false,
         // rateLimit: {
        //     windowMs: 15 * 60 * 1000,
        //     max: 10
        // },
        proxy: {
            target: "http://localhost:3004",
            changeOrigin: true,
            pathRewrite: {
                ['^/']: '',
            }
        }
    }
]

exports.ROUTES = ROUTES;