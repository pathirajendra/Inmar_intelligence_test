const mssql = require('mssql');

module.exports = async (config, params) => {
    return new Promise((resolve, reject) => {

        const requestParams = config.dbwrapper.getNewRequest();
        requestParams.input('location', mssql.NVarChar(50), params.location);
        requestParams.input('department', mssql.NVarChar(50), params.department);
        requestParams.input('category', mssql.NVarChar(50), params.category);

        requestParams.execute('GetDataByCategory', (err, result) => {
            if (err) {
                config.logger.error(err);
                reject(err);
            }

            resolve(result.recordsets[0]);
        })
    })
}