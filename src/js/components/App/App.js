import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import config from '../../../config';
import {Row, Col, Button, Jumbotron} from 'react-bootstrap';
import Header from './Header';
import MessageBoard from './MessageBoard';
import Message from './Message';
import Dashboard from './Dashboard';
import Footer from './Footer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      messagesChannel: props.messageBoardId,
      usersChannel: "usersChannel",
      newUser: {},
      newMessage: {},
      currentUser: null
    }
  }

  componentWillMount() {

    this.props.createUser().then(user => {
      localStorage.setItem('token', user.token);
      localStorage.setItem('currentUser', JSON.stringify(user.changedUser));
      this.setState({currentUser: user});
    });

    this.state.socket = io.connect(config.scapholdSubscriptionUrl, {query: `apiKey=${config.scapholdAppId}&token=${localStorage.getItem('token')}`});

    this.state.socket.on('connect', (data) => {
      console.log("Connected!");
      
      this.subscribeToUsers();
      this.subscribeToMessages();
    });
    this.state.socket.on('error', (err) => {
      console.log("Error connecting! Uh oh");
      console.log(err);
    });
    this.state.socket.on('exception', (exc) => {
      console.log("Exception");
      console.log(exc);
    })

    this.state.socket.on("subscribed", (data) => {
      console.log("Subscribed");
      console.log(data);
    })

    this.state.socket.on(this.state.messagesChannel, (data) => {
      console.log("Received subscription update for channel", this.state.messagesChannel);
      console.log(data);
      this.setState({newMessage: data.data.subscribeToMessages.changedMessage});
    });

    this.state.socket.on(this.state.usersChannel, (data) => {
      console.log("Received subscription update for channel", this.state.usersChannel);
      console.log(data);
      this.setState({newUser: data.data.subscribeToUsers.changedUser});
    });

  }

  subscribeToMessages() {
    let data = {
      query: `subscription subscribeToMessagesQuery($data: _SubscribeToMessagesInput!) {
        subscribeToMessages(input: $data) {
          changedMessage {
            id
            author {
              id
              username
              city
              country
              createdAtSecond
              createdAtMinute
              createdAtHour
              createdAtDay
              createdAtMonth
              createdAtYear
            }
            content
            createdAt
            createdAtSecond
            createdAtMinute
            createdAtHour
            createdAtDay
            createdAtMonth
            createdAtYear
          }
        }
      }`,
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

  subscribeToUsers() {
    let data = {
      query: `subscription subscribeToUsersQuery($data: _SubscribeToUsersInput!) {
        subscribeToUsers(input: $data) {
          changedUser {
            id
            username
            city
            country
            createdAtSecond
            createdAtMinute
            createdAtHour
            createdAtDay
            createdAtMonth
            createdAtYear
          }
        }
      }`,
      variables: {
          "data": {
              "channel": this.state.usersChannel,
              "transactionTypes": ["CREATE"]
          }
      }
    };
    
    this.state.socket.emit("subscribe", data);
  }

  render() {

    let currentUserId = null;
    if (this.state.currentUser) {
      currentUserId = this.state.currentUser.changedUser.id;
    }

    return (
      <div>
        <Header/>
        <div className="container">
          <Row style={styles.app}><h1>The Olympics Chat App</h1>&nbsp;Brought to you by <a target="_blank" href="https://scaphold.io" style={styles.a}>Scaphold.io</a></Row>
          <Row style={styles.app}>
            <Col sm={5}>
              <MessageBoard messageBoardId={this.props.messageBoardId} userId={currentUserId} newMessage={this.state.newMessage} />
            </Col>
            <Col sm={7}>
              <Dashboard newMessage={this.state.newMessage} newUser={this.state.newUser} />
            </Col>
          </Row>
        </div>
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  currentUser: React.PropTypes.func
};

const CREATE_USER = gql `
  mutation CreateUserQuery($user: _CreateUserInput!){
    createUser(input: $user) {
      token
      changedUser {
        id
        username
        city
        country
        ipAddress
        createdAtSecond
        createdAtMinute
        createdAtHour
        createdAtDay
        createdAtMonth
        createdAtYear
      }
    }
  }
`

const componentWithUser = graphql(CREATE_USER, {
  options: (ownProps) => ({
    variables: {
      user: {
        username: createNewUsername(),
        password: "password"
      }
    }
  }),
  props: ({ ownProps, mutate }) => ({
    createUser() {
      let current = JSON.parse(localStorage.getItem('current'));
      let d = new Date();
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
            createdAtMonth: d.getUTCMonth() ? d.getUTCMonth()+1 : 0,
            createdAtYear: d.getUTCFullYear() ? d.getUTCFullYear() : 0
          }
        }
      }).then(({ data }) => {
        // Successfully created new user
        return data.createUser;
      }).catch((error) => {
        console.log('There was an error sending the query', error);
      });     
    }
  })
});

const createNewUsername = () => {
  let sub = (((1+Math.random())*0x10000)|0).toString(16).substring(1)
  return (sub + sub + "-" + sub + "-4" + sub.substr(0,3) + "-" + sub + "-" + sub + sub + sub).toLowerCase();
}

export default componentWithUser(App);

const styles = {
  app: {
    margin: `40px 0`
  },
  a: {
    color: '#1daaa0'
  }
};
