import React from 'react';
import {Row, Col} from 'react-bootstrap';

class Message extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    let youComponent = <span></span>;
    if (this.props.message && this.props.message.author && this.props.userId == this.props.message.author.id) {
      youComponent = <span>(You)</span>
    }

    let metadataComponent = <div></div>;
    if (this.props.message.author) {
      metadataComponent = <div><span style={styles.message.metadata.left}> Posted on {this.props.message.author.createdAtMonth}/{this.props.message.author.createdAtDay} at {this.props.message.createdAtHour}:{this.props.message.createdAtMinute}:{this.props.message.createdAtSecond} </span><span style={styles.message.metadata.right}> from {this.props.message.author.city}, {this.props.message.author.country} {youComponent}</span></div>
    }

    return (
      <div className="message" style={styles.message}>
        <div><b>{this.props.message.content}</b></div>
        {metadataComponent}
      </div>
    );
  }
}

export default Message;

const styles = {
  message: {
    margin: '10px 10px',
    metadata: {
      left: {
        fontSize: '8px',
        textAlign: 'left'
      },
      right: {
        fontSize: '8px',
        textAlign: 'right'
      }
    }
  }
};
