let _dbwrapper = require('./dbRequest');
let mssql = require('mssql');

module.exports = async function () {
    try {
        let sqlParams = {
            server: "localhost",
            user: "sa",
            password: "Apple#123",
            database: "Inmar_Intelligence",
            port: 1433,
            pool: {
                max: 10,
                min: 0,
                idleTimeoutMillis: 30000
            }
        };
        var pool = new mssql.ConnectionPool(sqlParams);
        pool.connect()
            .then(res => {
                console.log("db connected")
            })
            .catch(err => {
                console.log('SQLConnError:', err);
            });

        let dbwrapper = await _dbwrapper(pool);

        return {
            dbwrapper: dbwrapper
        }
    }
    catch (ex) {
        console.log("db connection failed ", ex)
        return Promise.reject(ex);
    }
};