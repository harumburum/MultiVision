var path = require('path');

var rootPath = path.normalize(__dirname + '/../../');
module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost/multivision',
        port: process.env.PORT || 3030
    },
    production: {
        rootPath: rootPath,
        db: 'mongodb://harumburum:pw4vladimir@ds033569.mongolab.com:33569/supervision',
        port: process.env.PORT || 80
    }
}