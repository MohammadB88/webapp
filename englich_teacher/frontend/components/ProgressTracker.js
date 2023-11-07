import React from 'react';

class ProgressTracker extends React.Component {
  render() {
    return (
      <div id="progress-tracker">
        <h2>Progress Tracker</h2>
        <ul>
          {this.props.progress.map((lesson, index) => (
            <li key={index}>
              <span>{lesson.title}: </span>
              <span>{lesson.score}%</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ProgressTracker;
