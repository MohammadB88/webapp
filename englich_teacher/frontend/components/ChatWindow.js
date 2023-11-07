import React from 'react';

class ChatWindow extends React.Component {
  constructor(props) {
    super(props);
    this.chatWindowRef = React.createRef();
  }

  componentDidUpdate() {
    // Scroll to the bottom of the chat window
    this.chatWindowRef.current.scrollTop = this.chatWindowRef.current.scrollHeight;
  }

  render() {
    return (
      <div id="chat-window" ref={this.chatWindowRef}>
        {this.props.messages.map((message, index) => (
          <div key={index} className={message.fromUser ? 'message user-message' : 'message teacher-message'}>
            {message.text}
          </div>
        ))}
      </div>
    );
  }
}

export default ChatWindow;
