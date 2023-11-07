import React from 'react';
import ReactDOM from 'react-dom';
import InputField from './components/InputField';
import ChatWindow from './components/ChatWindow';
import Summary from './components/Summary';
import AdditionalResources from './components/AdditionalResources';
import ProgressTracker from './components/ProgressTracker';

class EnglishTeacherApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      summary: '',
      resources: [
        { name: 'Grammar Guide', link: '#' },
        { name: 'Vocabulary List', link: '#' },
        { name: 'Interactive Exercises', link: '#' }
    ],
    progress: [
      { title: 'Lesson 1', score: 80 },
      { title: 'Lesson 2', score: 90 },
      { title: 'Lesson 3', score: 70 }
    ]
  };
  this.addMessage = this.addMessage.bind(this);
  }

  addMessage(text) {
    const message = { text: text, fromUser: true };
    this.setState({ messages: [...this.state.messages, message] });
    // Make API call to backend service and get response
    // ...

    const responseMessage = { text: 'Response from English Teacher', fromUser: false };
    const summary = 'Summary of English Teacher response';

    this.setState({ messages: [...this.state.messages, responseMessage], summary: summary });
    }

    render() {
        return (
        <div>
        <InputField addMessage={this.addMessage} />
        <ChatWindow messages={this.state.messages} />
        {this.state.summary && <Summary summary={this.state.summary} />}
        <AdditionalResources resources={this.state.resources} />
        <ProgressTracker progress={this.state.progress} />
        </div>
        );
    }
}

ReactDOM.render(<EnglishTeacherApp />, document.getElementById('app'));
