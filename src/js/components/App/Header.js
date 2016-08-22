import React from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem, Modal, OverlayTrigger, Button} from 'react-bootstrap';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    }

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  render() {

    return (
      <Navbar style={styles.navbar}>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Scaphold</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight={true}>
          <NavItem onClick={this.open}>How To Use</NavItem>

          <Modal show={this.state.showModal} onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title>How To Use</Modal.Title>
            </Modal.Header>
            <Modal.Body>

              <p>This web page was made using <b>GraphQL Subscriptions</b> to power a <b>real-time app</b>.</p>
              <p style={styles.marketing.p}>
                The messaging client along with the analytics dashboard demonstrate the power of web sockets.
                In order to see the magic happen:
                <ol>
                  <li>
                    Open up two different browser tabs side by side so you can see both.
                  </li>
                  <li>
                    Add a message to either one of the sites.
                  </li>
                  <li>
                    You should notice the Conversation History and Mesage Graph update automatically in both browsers as it's listening to changes from the server.
                  </li>
                </ol>
              </p>

              <p style={styles.marketing.p}>
                If you like what you see, <a target="_blank" href="https://scapholdslackin.herokuapp.com" style={styles.marketing.a}>join our Slack channel today to learn more</a>!
              </p>

              <hr />

              <p>Here's what we used to build this app:</p>

              <h4 style={styles.marketing.h4}><a target="_blank" href="https://facebook.github.io/react/" style={styles.marketing.a}>React.js Boilerplate</a></h4>
              <p style={styles.marketing.p}>This React.js boilerplate helps developers create modern, performant, and clean web apps with the help of Scaphold.io.</p>

              <hr />

              <h4 style={styles.marketing.h4}><a target="_blank" href="http://socket.io/" style={styles.marketing.a}>Socket.io</a></h4>
              <p style={styles.marketing.p}>Leverage the simplicity and power of Socket.io and GraphQL to enable real-time functionality to create apps like messaging clients and analytics dashboards.</p>

              <hr />

              <h4 style={styles.marketing.h4}><a target="_blank" href="https://react-bootstrap.github.io/" style={styles.marketing.a}>React-Bootstrap</a></h4>
              <p style={styles.marketing.p}>Smoothe and creative components to fit the way you want your apps to be experienced.</p>

              <hr />

              <h4 style={styles.marketing.h4}><a target="_blank" href="https://webpack.github.io/docs/list-of-tutorials.html" style={styles.marketing.a}>Webpack</a></h4>
              <p style={styles.marketing.p}>Webpack is a module bundler that helps you serve your application in any environment with hot reloading.</p>

              <hr />

              <p style={styles.marketing.p}>
                If you have any questions, please contact <a href="mailto:support@scaphold.io" style={styles.marketing.a}>support@scaphold.io</a>.
              </p>

            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.close}>Close</Button>
            </Modal.Footer>
          </Modal>

        </Nav>
      </Navbar>
    );
  }
}

export default Header;

const styles = {
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
