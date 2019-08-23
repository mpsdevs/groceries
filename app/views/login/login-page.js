var UserViewModel = require("../shared/view-models/user-view-model");
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