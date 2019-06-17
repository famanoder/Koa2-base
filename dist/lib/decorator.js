"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Config = Config;
exports.Middlewares = Middlewares;
exports.Service = Service;
exports.Router = void 0;

var _fs = _interopRequireDefault(require("mz/fs"));

var _path = require("path");

var _injector = _interopRequireDefault(require("@eryue/injector"));

var _utils = require("@eryue/utils");

var _router = _interopRequireDefault(require("./router"));

var _contextNames = require("./context-names");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Config(conf) {
  const [config = {}] = _injector.default.resolve(_contextNames.CONFIG);

  const argType = (0, _utils.getArgType)(conf);

  _utils.assert.ok(argType.isString || argType.isObject, 'invalid argument.'); // maybe a config file


  if (argType.isString) {
    const confFilepath = (0, _path.join)(process.cwd(), conf);

    const has = _fs.default.existsSync(confFilepath);

    if (has) {
      conf = require(confFilepath);

      if (conf.default) {
        conf = conf.default;
      }
    }
  }

  Object.assign(config, conf);

  _injector.default.add(_contextNames.CONFIG, config);

  return function (target) {};
}

function Middlewares(...arr) {
  let [middleares = []] = _injector.default.resolve(_contextNames.MIDDLEWARES);

  middleares = middleares.concat(_utils._.flatten(arr));

  _injector.default.add(_contextNames.MIDDLEWARES, middleares);

  return function (target) {};
}

function Service(target) {
  const name = target.name.toLowerCase();
  const service = new target();

  let [services] = _injector.default.resolve(_contextNames.SERVICE);

  if (services) {
    services[name] = service;
  } else {
    services = {
      [name]: service
    };
  }

  _injector.default.add(_contextNames.SERVICE, services);
}

const Router = {};
exports.Router = Router;
;
['all', 'get', 'put', 'post', 'patch', 'del', 'delete'].forEach(method => {
  Router[method] = function () {
    _router.default[method].apply(_router.default, arguments);

    return function (target) {};
  };
});