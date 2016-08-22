'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = function (_React$Component) {
  _inherits(Header, _React$Component);

  function Header(props) {
    _classCallCheck(this, Header);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Header).call(this, props));

    _this.state = {
      showModal: false
    };

    _this.open = _this.open.bind(_this);
    _this.close = _this.close.bind(_this);
    return _this;
  }

  _createClass(Header, [{
    key: 'close',
    value: function close() {
      this.setState({ showModal: false });
    }
  }, {
    key: 'open',
    value: function open() {
      this.setState({ showModal: true });
    }
  }, {
    key: 'render',
    value: function render() {

      return _react2.default.createElement(
        _reactBootstrap.Navbar,
        { style: styles.navbar },
        _react2.default.createElement(
          _reactBootstrap.Navbar.Header,
          null,
          _react2.default.createElement(
            _reactBootstrap.Navbar.Brand,
            null,
            _react2.default.createElement(
              'a',
              { href: '/' },
              'Scaphold'
            )
          )
        ),
        _react2.default.createElement(
          _reactBootstrap.Nav,
          { pullRight: true },
          _react2.default.createElement(
            _reactBootstrap.NavItem,
            { onClick: this.open },
            'How To Use'
          ),
          _react2.default.createElement(
            _reactBootstrap.Modal,
            { show: this.state.showModal, onHide: this.close },
            _react2.default.createElement(
              _reactBootstrap.Modal.Header,
              { closeButton: true },
              _react2.default.createElement(
                _reactBootstrap.Modal.Title,
                null,
                'How To Use'
              )
            ),
            _react2.default.createElement(
              _reactBootstrap.Modal.Body,
              null,
              _react2.default.createElement(
                'p',
                null,
                'This web page was made using ',
                _react2.default.createElement(
                  'b',
                  null,
                  'GraphQL Subscriptions'
                ),
                ' to power a ',
                _react2.default.createElement(
                  'b',
                  null,
                  'real-time app'
                ),
                '.'
              ),
              _react2.default.createElement(
                'p',
                { style: styles.marketing.p },
                'The messaging client along with the analytics dashboard demonstrate the power of web sockets. In order to see the magic happen:',
                _react2.default.createElement(
                  'ol',
                  null,
                  _react2.default.createElement(
                    'li',
                    null,
                    'Open up two different browser tabs side by side so you can see both.'
                  ),
                  _react2.default.createElement(
                    'li',
                    null,
                    'Add a message to either one of the sites.'
                  ),
                  _react2.default.createElement(
                    'li',
                    null,
                    'You should notice the Conversation History and Mesage Graph update automatically in both browsers as it\'s listening to changes from the server.'
                  )
                )
              ),
              _react2.default.createElement(
                'p',
                { style: styles.marketing.p },
                'If you like what you see, ',
                _react2.default.createElement(
                  'a',
                  { target: '_blank', href: 'https://scapholdslackin.herokuapp.com', style: styles.marketing.a },
                  'join our Slack channel today to learn more'
                ),
                '!'
              ),
              _react2.default.createElement('hr', null),
              _react2.default.createElement(
                'p',
                null,
                'Here\'s what we used to build this app:'
              ),
              _react2.default.createElement(
                'h4',
                { style: styles.marketing.h4 },
                _react2.default.createElement(
                  'a',
                  { target: '_blank', href: 'https://facebook.github.io/react/', style: styles.marketing.a },
                  'React.js Boilerplate'
                )
              ),
              _react2.default.createElement(
                'p',
                { style: styles.marketing.p },
                'This React.js boilerplate helps developers create modern, performant, and clean web apps with the help of Scaphold.io.'
              ),
              _react2.default.createElement('hr', null),
              _react2.default.createElement(
                'h4',
                { style: styles.marketing.h4 },
                _react2.default.createElement(
                  'a',
                  { target: '_blank', href: 'http://socket.io/', style: styles.marketing.a },
                  'Socket.io'
                )
              ),
              _react2.default.createElement(
                'p',
                { style: styles.marketing.p },
                'Leverage the simplicity and power of Socket.io and GraphQL to enable real-time functionality to create apps like messaging clients and analytics dashboards.'
              ),
              _react2.default.createElement('hr', null),
              _react2.default.createElement(
                'h4',
                { style: styles.marketing.h4 },
                _react2.default.createElement(
                  'a',
                  { target: '_blank', href: 'https://react-bootstrap.github.io/', style: styles.marketing.a },
                  'React-Bootstrap'
                )
              ),
              _react2.default.createElement(
                'p',
                { style: styles.marketing.p },
                'Smoothe and creative components to fit the way you want your apps to be experienced.'
              ),
              _react2.default.createElement('hr', null),
              _react2.default.createElement(
                'h4',
                { style: styles.marketing.h4 },
                _react2.default.createElement(
                  'a',
                  { target: '_blank', href: 'https://webpack.github.io/docs/list-of-tutorials.html', style: styles.marketing.a },
                  'Webpack'
                )
              ),
              _react2.default.createElement(
                'p',
                { style: styles.marketing.p },
                'Webpack is a module bundler that helps you serve your application in any environment with hot reloading.'
              ),
              _react2.default.createElement('hr', null),
              _react2.default.createElement(
                'p',
                { style: styles.marketing.p },
                'If you have any questions, please contact ',
                _react2.default.createElement(
                  'a',
                  { href: 'mailto:support@scaphold.io', style: styles.marketing.a },
                  'support@scaphold.io'
                ),
                '.'
              )
            ),
            _react2.default.createElement(
              _reactBootstrap.Modal.Footer,
              null,
              _react2.default.createElement(
                _reactBootstrap.Button,
                { onClick: this.close },
                'Close'
              )
            )
          )
        )
      );
    }
  }]);

  return Header;
}(_react2.default.Component);

exports.default = Header;


var styles = {
  navbar: {
    marginBottom: 0
  },
  marketing: {
    margin: '40px 0',
    p: {
      marginTop: 28
    },
    h4: {
      marginTop: 28
    },
    a: {
      color: '#1daaa0'
    }
  }
};