"use strict";

var _start = _interopRequireDefault(require("./lib/start"));

var _decorator = require("./lib/decorator");

var _class, _dec, _dec2, _dec3, _dec4, _class2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// function & inject
let User = (0, _decorator.Service)(_class = class User {
  getUserList(id) {
    const users = 'users';
    return users;
  }

}) || _class;

let App = (_dec = (0, _decorator.Config)('config.js'), _dec2 = _decorator.Router.get('v1', {
  'user': async function ($helper, $service) {
    // console.log(context.config);
    // console.log($context, next, $service, $helper)
    const user = await $service.user.getUserList(); // context.body = user;

    $helper.success(user); // await next();
  },
  'greet': 'Hello, world.'
}), _dec3 = (0, _decorator.Middlewares)([async (cx, next) => {
  // cx.body=cx.aa;
  cx.body = qws + 'cx.service.user.getUserList()'; // await next();
}]), _dec4 = Register({
  middlewares: {},
  context: {},
  schedules: {}
}), _dec(_class2 = _dec2(_class2 = _dec3(_class2 = _dec4(_class2 = class App extends _start.default {}) || _class2) || _class2) || _class2) || _class2);
new App().then(port => console.log(`an app server started at ${port}.`));