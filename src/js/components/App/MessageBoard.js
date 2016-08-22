import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {Row, Col} from 'react-bootstrap';
import Message from './Message';
import MessageForm from './MessageForm';

class MessageBoard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      newMessage: {},
      newMessages: []
    }

    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
  }

  componentWillReceiveProps(props) {
    if (props.newMessage.id) {
      let newMsgs = this.state.newMessages;
      newMsgs.push(props.newMessage);
      this.setState({newMessages: newMsgs});
    }
  }

  handleMessageSubmit(message) {
    this.props.createMessage(message.content);
  }

  render() {
    let conversationHeader = "Loading message title...";
    let messages = "Loading message history...";
    let newMessages = null;
    if (this.props.data.getMessageBoard && this.props.data.getMessageBoard.name) {
      conversationHeader = <h3> Talk about the {this.props.data.getMessageBoard.name} </h3>;
      messages = this.props.data.getMessageBoard.messages.edges.map((message, i) => {
        return (
          <Message
            key={i}
            message={message.node}
          />
        );
      });
      newMessages = this.state.newMessages.map((newMsg, i) => {
        return (
          <Message
            key={i}
            message={newMsg}
            userId={this.props.userId}
          />
        )
      }).reverse();
    }

    return (
      <div>
        <div className='messages'>
          {conversationHeader}
          <MessageForm
            onMessageSubmit={this.handleMessageSubmit}
          />
          {newMessages ? newMessages : ""}
          {messages}
        </div>
      </div>
    );
  }
}

MessageBoard.propTypes = {
  data: React.PropTypes.object.isRequired,
  createMessage: React.PropTypes.func.isRequired,
  messageBoardId: React.PropTypes.string,
  userId: React.PropTypes.string
};

const GET_MESSAGEBOARD = gql `
  query GetMessageBoardQuery ($boardId: ID!) {
    getMessageBoard(id: $boardId) {
      id
      name
      messages (first: 10, orderBy: "-createdAt") {
        edges {
          node {
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
      }
    }
  }
`

const CREATE_MESSAGE = gql `
  mutation CreateMessageQuery($data: _CreateMessageInput!) {
    createMessage(input: $data) {
      changedMessage {
        id
        author {
          id
          username
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
  }
`

const componentWithMessageBoard = graphql(GET_MESSAGEBOARD, {
  options: (ownProps) => ({
    variables: {
      boardId: ownProps.messageBoardId
    }
  })
})

const componentWithCreateMessage = graphql(CREATE_MESSAGE, {
  props: ({ ownProps, mutate }) => ({
    createMessage(content) {
      let d = new Date();
      return mutate({
        variables: {
          data: {
            authorId: ownProps.userId,
            messageBoardId: ownProps.messageBoardId,
            content: content,
            createdAtSecond: d.getUTCSeconds(),
            createdAtMinute: d.getUTCMinutes(),
            createdAtHour: d.getUTCHours(),
            createdAtDay: d.getUTCDate(),
            createdAtMonth: d.getUTCMonth()+1,
            createdAtYear: d.getUTCFullYear()
          }
        }
      }).then(({ data }) => {
        // console.log("SUCCESS");
      }).catch((error) => {
        // console.log("FAILED");
      })
    }
  })
})

export default componentWithCreateMessage(componentWithMessageBoard(MessageBoard));

const styles = {
};
