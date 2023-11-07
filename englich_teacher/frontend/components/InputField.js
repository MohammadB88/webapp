
import React from 'react';

class InputField extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ text: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addMessage(this.state.text);
    this.setState({ text: '' });
  }

  render() {
    return (
      <form id="input-field" onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.text} onChange={this.handleChange} placeholder="Type your question or text here" />
        <button type="submit">Send</button>
      </form>
    );
  }
}

export default InputField;
