export default {
    jwtPassword: process.env.jwtPassword,
    db_config: {
        type: process.env.dbtype,
        host: process.env.dbhost,
        port: process.env.dbport,
        username: process.env.dbusername,
        password: process.env.dbpassword,
        database: process.env.dbschema,
    }
}