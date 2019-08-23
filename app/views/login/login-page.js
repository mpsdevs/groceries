var UserViewModel = require("../shared/view-models/user-view-model");
var Sqlite = require("nativescript-sqlite");

var user = new UserViewModel();
var page;
var email;
exports.loaded = function (args) {
    page = args.object;
    page.bindingContext = user;
}
exports.signIn = function () {
    user.login();
}
exports.register = function () {
    user.register();
}
function createTable() {
    (new Sqlite("my.db")).then(db => {
        db.execSQL("CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT)").then(id => {
            this.database = db;
            console.log("done creating YAYAaY");
        }, error => {
            console.log("CREATE TABLE ERROR", error);
        });
    }, error => {
        console.log("OPEN DB ERROR", error);
    });
}
createTable();