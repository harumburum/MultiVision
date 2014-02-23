var mongoose = require('mongoose'),
    encryption = require('../utilities/encryption');


var userSchema = mongoose.Schema({
    firstName: {type: String, required: '{PATH} is required!'} ,
    lastName: {type: String, required: '{PATH} is required!'},
    username: {type: String, required: '{PATH} is required!', unique: true},
    salt: {type: String, required: '{PATH} is required!'},
    hash_pwd: {type: String, required: '{PATH} is required!'},
    roles: [String]
});

userSchema.methods = {
    authenticate: function (passwordToMath) {
        console.log(this.hash_pwd);
        console.log(encryption.hashPwd(this.salt, passwordToMath))
        return encryption.hashPwd(this.salt, passwordToMath) === this.hash_pwd;
    },
    hasRole: function(role){
        return this.roles.indexOf(role) > -1
    }
}

var User = mongoose.model('user', userSchema);
function createDefaultUsers() {
    User.find({}).exec(function (err, collection) {
        if (collection.length == 0) {
            var salt, hash;
            salt = encryption.createSalt();
            hash = encryption.hashPwd(salt, 'admin');
            User.create({firstName: 'Vladimir', lastName: 'Litvinchik', username: 'admin', salt: salt, hash_pwd: hash, roles: ['admin']});
            salt = encryption.createSalt();
            hash = encryption.hashPwd(salt, 'olchik777');
            User.create({firstName: 'Olga', lastName: 'Litvinchik', username: 'olchik777', salt: salt, hash_pwd: hash, roles: []});
            salt = encryption.createSalt();
            hash = encryption.hashPwd(salt, 'yanko');
            User.create({firstName: 'Yana', lastName: 'Litvinchik', username: 'yanko', salt: salt, hash_pwd: hash});
        }
    });
};

exports.createDefaultUsers = createDefaultUsers;

