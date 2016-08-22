'use strict';

require('babel-polyfill');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _config = require('./../config');

var _config2 = _interopRequireDefault(_config);

var _apolloClient = require('apollo-client');

var _apolloClient2 = _interopRequireDefault(_apolloClient);

var _reactApollo = require('react-apollo');

var _App = require('./components/App/App');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var networkInterface = (0, _apolloClient.createNetworkInterface)(_config2.default.scapholdUrl);
networkInterface.use([{
  applyMiddleware: function applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {}; // Create the header object if needed.
    }
    if (localStorage.getItem('token')) {
      req.options.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
    }
    next();
  }
}]);

var client = new _apolloClient2.default({
  networkInterface: networkInterface
});

_reactDom2.default.render(_react2.default.createElement(
  _reactApollo.ApolloProvider,
  { client: client },
  _react2.default.createElement(_App2.default, { messageBoardId: 'NzdkMTliMDYtNTkyZC00MWRlLThlOTctOWZjZDQ1YmU1ZGYxOjNlNzMzNWM1LWFjYWItNGVjOC1hZDFjLWFlYmE2NWNmMTIxNA==' })
), document.getElementById('root'));