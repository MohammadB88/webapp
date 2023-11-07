import React from 'react';

class Summary extends React.Component {
  render() {
    return (
      <div id="summary">
        <h2>Summary</h2>
        <p>{this.props.summary}</p>
      </div>
    );
  }
}

export default Summary;
