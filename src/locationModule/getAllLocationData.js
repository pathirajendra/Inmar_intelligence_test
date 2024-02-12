const mssql = require('mssql');

module.exports = (config, params, callback) => {
    const requestParams = config.dbwrapper.getNewRequest();

    requestParams.execute('GetAllLocations', (err, result) => {
        if (err) {
            config.logger.error(err);
            callback(err);
            return
        }

        return callback(null, result.recordsets[0]);
    })
}