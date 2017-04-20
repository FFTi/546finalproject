const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.Users;
const uuid = require('node-uuid');
const bcrypt = require('bcrypt');

let exportedMethods = {
    addNewUsers(username, password) {
        return new Promise((resolve, recject) => {
            return users().then((userCollection) => {
                let ID = uuid.v4();
                let newUser = {
                    _id: ID,
                    username: username,
                    hashedPassword: bcrypt.hashSync(password, 10),
                    profile: {
                        name: "Unset",
                        hobby: "Unset",
                        _id: ID
                    },
                    order_history: [],
                    shopping_cart: []
                };
                console.log("addNewUsers!");
                return;
                return userCollection.insertOne(newUser).then((newInsertInformation) => {
                    return newInsertInformation._id;
                }).then((newUserId) => {
                    return this.getUserById(newUserId);
                });
            });
        }).catch((Error) => {
            return Promise.reject(Error);
        });
    },
    getAllUsers() {
        return new Promise((resolve, recject) => {
            return users().then((userCollection) => {
                resolve(userCollection.find({}).toArray());
            });
        }).catch((Error) => {
            return Promise.reject(Error);
        });
    },

    getUserById(id) {
        return new Promise((resolve, recject) => {
            return users().then((userCollection) => {
                return userCollection.findOne({ _id: id }).then((user) => {
                    if (!user) Promise.reject("User not found");
                    resolve(user);
                });
            });
        }).catch((Error) => {
            return Promise.reject(Error);
        });
    },

    updateProfile(name, hobby) {

        return new Promise((resolve, recject) => {

            if (name === undefined) return recject("name can't be null");
            //find name in user collection and update profile, pay attention for _id attritube

            return resolve();
        }).catch((Error) => {
            return Promise.reject(Error);
        });
    },
    getUserByUsernameForRegister(username) {
        return new Promise((resolve, recject) => {
            return users().then((userCollection) => {
                return userCollection.findOne({ username: username }).then(() => {
                    return Promise.reject("This username has been registered, please try another!");
                });
                console.log("getUserByUsernameForRegister");
                return resolve(true);
            });
        }).catch((Error) => {
            return Promise.reject(Error);
        });
    },

    getUserByUsernameAndPassword(username, password) {
        return new Promise((resolve, recject) => {
            if (username === undefined) return Promise.reject("No username provided");
            if (password === undefined) return Promise.reject("No password provided");

            return userCollection.findOne({ username: username }).then((user) => {
                let res = bcrypt.compareSync(password, user.password);
                if (!res) Promise.reject("Invalid username or password!");
                resolve(user);
            });
        }).catch((Error) => {
            return Promise.reject(Error);
        });
    }
}

module.exports = exportedMethods;