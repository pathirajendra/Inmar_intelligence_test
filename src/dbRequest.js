let mssql = require('mssql');
module.exports = (connPool) => {
    return new Promise((res, rej) => {
        res({
            getNewRequest: function () {
                return new mssql.Request(connPool);
            }
        });
    });
};