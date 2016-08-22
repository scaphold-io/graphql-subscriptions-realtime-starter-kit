#!/usr/bin/env babel-node --optional es7.asyncFunctions
'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _schema = require('../data/schema');

var _graphql = require('graphql');

var _utilities = require('graphql/utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

// Save JSON of full schema introspection for Babel Relay Plugin to use
_asyncToGenerator(regeneratorRuntime.mark(function _callee() {
  var result;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _graphql.graphql)(_schema.Schema, _utilities.introspectionQuery);

        case 2:
          result = _context.sent;

          if (result.errors) {
            console.error('ERROR introspecting schema: ', JSON.stringify(result.errors, null, 2));
          } else {
            _fs2.default.writeFileSync(_path2.default.join(__dirname, '../data/schema.json'), JSON.stringify(result, null, 2));
          }

        case 4:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined);
}))();

// Save user readable type system shorthand of schema
_fs2.default.writeFileSync(_path2.default.join(__dirname, '../data/schema.graphql'), (0, _utilities.printSchema)(_schema.Schema));