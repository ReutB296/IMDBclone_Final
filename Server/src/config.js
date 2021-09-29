const config = {
    development: {
       url: 'http://localhost:8080',
       port: 8080,
       
    },
    production: {
        url: 'http://www.google.com'
    }
}

export default config[process.env.NODE_ENV || 'development']
