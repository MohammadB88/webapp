import React from 'react';

class AdditionalResources extends React.Component {
  render() {
    return (
      <div id="additional-resources">
        <h2>Additional Resources</h2>
        <ul>
          {this.props.resources.map((resource, index) => (
            <li key={index}>
              <a href={resource.link}>{resource.name}</a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default AdditionalResources;
