import React, { Component } from 'react';
import './Browser.css';
import TagChooser from './TagPane';

class Browser extends Component {
  render() {
    return (
      <div className="Browser">
        <TagChooser />
      </div>
    );
  }
}

export default Browser;
