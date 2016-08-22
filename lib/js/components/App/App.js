'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n  mutation CreateUserQuery($user: _CreateUserInput!){\n    createUser(input: $user) {\n      token\n      changedUser {\n        id\n        username\n        city\n        country\n        ipAddress\n        createdAtSecond\n        createdAtMinute\n        createdAtHour\n        createdAtDay\n        createdAtMonth\n        createdAtYear\n      }\n    }\n  }\n'], ['\n  mutation CreateUserQuery($user: _CreateUserInput!){\n    createUser(input: $user) {\n      token\n      changedUser {\n        id\n        username\n        city\n        country\n        ipAddress\n        createdAtSecond\n        createdAtMinute\n        createdAtHour\n        createdAtDay\n        createdAtMonth\n        createdAtYear\n      }\n    }\n  }\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactApollo = require('react-apollo');

var _graphqlTag = require('graphql-tag');

var _graphqlTag2 = _interopRequireDefault(_graphqlTag);

var _config = require('../../../config');

var _config2 = _interopRequireDefault(_config);

var _reactBootstrap = require('react-bootstrap');

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

var _MessageBoard = require('./MessageBoard');

var _MessageBoard2 = _interopRequireDefault(_MessageBoard);

var _Message = require('./Message');

var _Message2 = _interopRequireDefault(_Message);

var _Dashboard = require('./Dashboard');

var _Dashboard2 = _interopRequireDefault(_Dashboard);

var _Footer = require('./Footer');

var _Footer2 = _interopRequireDefault(_Footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props));

    _this.state = {
      socket: null,
      messagesChannel: props.messageBoardId,
      usersChannel: "usersChannel",
      newUser: {},
      newMessage: {},
      currentUser: null
    };
    return _this;
  }

  _createClass(App, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      this.props.createUser().then(function (user) {
        localStorage.setItem('token', user.token);
        localStorage.setItem('currentUser', JSON.stringify(user.changedUser));
        _this2.setState({ currentUser: user });
      });

      this.state.socket = io.connect(_config2.default.scapholdSubscriptionUrl, { query: 'apiKey=' + _config2.default.scapholdAppId + '&token=' + localStorage.getItem('token') });

      this.state.socket.on('connect', function (data) {
        console.log("Connected!");

        _this2.subscribeToUsers();
        _this2.subscribeToMessages();
      });
      this.state.socket.on('error', function (err) {
        console.log("Error connecting! Uh oh");
        console.log(err);
      });
      this.state.socket.on('exception', function (exc) {
        console.log("Exception");
        console.log(exc);
      });

      this.state.socket.on("subscribed", function (data) {
        console.log("Subscribed");
        console.log(data);
      });

      this.state.socket.on(this.state.messagesChannel, function (data) {
        console.log("Received subscription update for channel", _this2.state.messagesChannel);
        console.log(data);
        _this2.setState({ newMessage: data.data.subscribeToMessages.changedMessage });
      });

      this.state.socket.on(this.state.usersChannel, function (data) {
        console.log("Received subscription update for channel", _this2.state.usersChannel);
        console.log(data);
        _this2.setState({ newUser: data.data.subscribeToUsers.changedUser });
      });
    }
  }, {
    key: 'subscribeToMessages',
    value: function subscribeToMessages() {
      var data = {
        query: 'subscription subscribeToMessagesQuery($data: _SubscribeToMessagesInput!) {\n        subscribeToMessages(input: $data) {\n          changedMessage {\n            id\n            author {\n              id\n              username\n              city\n              country\n              createdAtSecond\n              createdAtMinute\n              createdAtHour\n              createdAtDay\n              createdAtMonth\n              createdAtYear\n            }\n            content\n            createdAt\n            createdAtSecond\n            createdAtMinute\n            createdAtHour\n            createdAtDay\n            createdAtMonth\n            createdAtYear\n          }\n        }\n      }',
        variables: {
          "data": {
            "channel": this.state.messagesChannel,
            "transactionTypes": ["CREATE"],
            "filter": {
              "messageBoardId": this.props.messageBoardId
            }
          }
        }
      };

      this.state.socket.emit("subscribe", data);
    }
  }, {
    key: 'subscribeToUsers',
    value: function subscribeToUsers() {
      var data = {
        query: 'subscription subscribeToUsersQuery($data: _SubscribeToUsersInput!) {\n        subscribeToUsers(input: $data) {\n          changedUser {\n            id\n            username\n            city\n            country\n            createdAtSecond\n            createdAtMinute\n            createdAtHour\n            createdAtDay\n            createdAtMonth\n            createdAtYear\n          }\n        }\n      }',
        variables: {
          "data": {
            "channel": this.state.usersChannel,
            "transactionTypes": ["CREATE"]
          }
        }
      };

      this.state.socket.emit("subscribe", data);
    }
  }, {
    key: 'render',
    value: function render() {

      var currentUserId = null;
      if (this.state.currentUser) {
        currentUserId = this.state.currentUser.changedUser.id;
      }

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_Header2.default, null),
        _react2.default.createElement(
          'div',
          { className: 'container' },
          _react2.default.createElement(
            _reactBootstrap.Row,
            { style: styles.app },
            _react2.default.createElement(
              'h1',
              null,
              'The Olympics Chat App'
            ),
            ' Brought to you by ',
            _react2.default.createElement(
              'a',
              { target: '_blank', href: 'https://scaphold.io', style: styles.a },
              'Scaphold.io'
            )
          ),
          _react2.default.createElement(
            _reactBootstrap.Row,
            { style: styles.app },
            _react2.default.createElement(
              _reactBootstrap.Col,
              { sm: 5 },
              _react2.default.createElement(_MessageBoard2.default, { messageBoardId: this.props.messageBoardId, userId: currentUserId, newMessage: this.state.newMessage })
            ),
            _react2.default.createElement(
              _reactBootstrap.Col,
              { sm: 7 },
              _react2.default.createElement(_Dashboard2.default, { newMessage: this.state.newMessage, newUser: this.state.newUser })
            )
          )
        ),
        _react2.default.createElement(_Footer2.default, null)
      );
    }
  }]);

  return App;
}(_react2.default.Component);

App.propTypes = {
  currentUser: _react2.default.PropTypes.func
};

var CREATE_USER = (0, _graphqlTag2.default)(_templateObject);

var componentWithUser = (0, _reactApollo.graphql)(CREATE_USER, {
  options: function options(ownProps) {
    return {
      variables: {
        user: {
          username: createNewUsername(),
          password: "password"
        }
      }
    };
  },
  props: function props(_ref) {
    var ownProps = _ref.ownProps;
    var mutate = _ref.mutate;
    return {
      createUser: function createUser() {
        var current = JSON.parse(localStorage.getItem('current'));
        var d = new Date();
        return mutate({
          variables: {
            user: {
              username: createNewUsername(),
              password: "password",
              city: current.city || "",
              country: current.country || "",
              ipAddress: current.ip || "",
              createdAtSecond: d.getUTCSeconds() ? d.getUTCSeconds() : 0,
              createdAtMinute: d.getUTCMinutes() ? d.getUTCMinutes() : 0,
              createdAtHour: d.getUTCHours() ? d.getUTCHours() : 0,
              createdAtDay: d.getUTCDate() ? d.getUTCDate() : 0,
              createdAtMonth: d.getUTCMonth() ? d.getUTCMonth() + 1 : 0,
              createdAtYear: d.getUTCFullYear() ? d.getUTCFullYear() : 0
            }
          }
        }).then(function (_ref2) {
          var data = _ref2.data;

          // Successfully created new user
          return data.createUser;
        }).catch(function (error) {
          console.log('There was an error sending the query', error);
        });
      }
    };
  }
});

var createNewUsername = function createNewUsername() {
  var sub = ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
  return (sub + sub + "-" + sub + "-4" + sub.substr(0, 3) + "-" + sub + "-" + sub + sub + sub).toLowerCase();
};

exports.default = componentWithUser(App);


var styles = {
  app: {
    margin: '40px 0'
  },
  a: {
    color: '#1daaa0'
  }
};