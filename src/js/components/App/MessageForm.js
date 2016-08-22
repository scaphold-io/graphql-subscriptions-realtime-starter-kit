import React from 'react';
import {Row, Col} from 'react-bootstrap';

class MessageForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      content: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  componentDidMount() {
  }

  handleSubmit(e) {
    e.preventDefault();
    let message = {
        content: this.state.content
    }
    if (message.content == '') return;
    this.props.onMessageSubmit(message);
    this.setState({ content: '' });
  }

  changeHandler(e) {
    this.setState({ content : e.target.value });
  }

  render() {
    return(
    <div className='message_form' style={styles.form}>
        <h4>Say something great!</h4>
        <form onSubmit={this.handleSubmit}>
        <input
          style={styles.input}
          onChange={this.changeHandler}
          value={this.state.content}
        />
        </form>
    </div>
    );
  }
}

export default MessageForm;

const styles = {
  input: {
    fontSize: '20px',
    width: '100%',
    resize: 'both',
    overflow: 'auto'
  },
  form: {
    margin: `30px 30px`
  }
};
