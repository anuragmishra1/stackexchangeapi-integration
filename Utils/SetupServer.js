'use strict';

const mongoose = require('mongoose');

const Config = require('../Config');
const Models = require('../Models');
const { TokenManager } = require('../Lib');
const { RoleManager } = require('../Lib');
const UniversalFunctions = require('./UniversalFunctions');

// Assign global promise in mongoose
mongoose.Promise = global.Promise;

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}

// Connect to MongoDB
mongoose.connect(Config.DbConfig.mongo.URI, options, (err) => {
    if (err) {
        console.error('DB Error: ', err);
        process.exit(1);
    } else {
        console.log('::::::: START SETTING UP THE SERVER :::::::');
        createDefaultRoles();
    }
});

// Create default roles
const createDefaultRoles = async () => {
    for (let role of Config.Constants.userRoles) {
        try {
            await new Models.Roles(role).save();
        } catch (err) {
            mongoose.connection.close();
            process.exit(1);
        }
    }
    console.log(' ROLES CREATED ');
    createServerUser();
};

// Create Server User
const createServerUser = async () => {
    const roles = await RoleManager.getRoleId([Config.Constants.serverUser.role]);
    let userData = {};
    let output = {};
    const dataToSave = {
        roles: roles,
        name: Config.Constants.serverUser.name,
        email: Config.Constants.serverUser.email,
        password: UniversalFunctions.createHash(Config.Constants.serverUser.password),
        login_name: Config.Constants.serverUser.login_name
    };

    try {
        userData = await Models.Users(dataToSave).save();
    } catch (err) {
        mongoose.connection.close();
        process.exit(1);
    }

    try {
        const tokenData = {
            id: userData._id
        };
        output = await TokenManager.setToken(tokenData);
    } catch (err) {
        mongoose.connection.close();
        process.exit(1);
    }

    if (output && output.accessToken) {
        const accessToken = output && output.accessToken;
        console.log(' SERVER USER CREATED ');
        console.log('Auth Token:::::: ', accessToken);
        mongoose.connection.close();
        process.exit(0);
    } else {
        mongoose.connection.close();
        process.exit(1);
    }
};
