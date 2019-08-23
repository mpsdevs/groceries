var config = require("../../shared/config");
var fetchModule = require("tns-core-modules/fetch");
var observableModule = require("tns-core-modules/data/observable");

function User(info) {
  info = info || {};

  // You can add properties to observables on creation
  var viewModel = new observableModule.fromObject({
    email: info.email || "",
    password: info.password || ""
  });

  viewModel.login = function () {
    this.database.execSQL("INSERT INTO user (email, password) VALUES (?, ?)", [viewModel.get("email"), viewModel.get("password")]).then(id => {console.log("INSERT RESULT", id);this.fetch();}, error => {console.log("INSERT ERROR", error);
  });
  };
//   viewModel.register = function() {
//     if (!viewModel.get("email") || !viewModel.get("password")) {
//       return Promise.reject(new Error("Please provide both an email address and password."));
//     } 
    
//     return fetchModule.fetch(config.apiUrl + "user/" + config.appKey, {
//       method: "POST",
//   body: JSON.stringify({
//         username: viewModel.get("email"),
//         email: viewModel.get("email"),
//         password: viewModel.get("password")
//       }),
//       headers: getCommonHeaders()
//     }).then(handleErrors);
// } ;

  return viewModel;
  }

function getCommonHeaders() {
  return {
    "Content-Type": "application/json",
    "Authorization": config.appUserHeader
  }
}

function handleErrors(response) {
  if (!response.ok) {
    console.log(JSON.stringify(response));
    throw Error(response.statusText);
  }
  return response;
}

module.exports = User;
