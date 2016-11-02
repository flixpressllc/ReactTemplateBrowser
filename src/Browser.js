import React, { Component } from 'react';
import './Browser.css';
import TagChooser from './TagPane';
import { union } from 'lodash';

class Browser extends Component {

  getTags() {
    const templates = this.props.templates;
    if (templates === undefined) return undefined;
    let tagNames = [];
    templates.map( (template) =>{
      tagNames = union(tagNames, template.tags);
    });
    return tagNames;
  }

  render() {
    const tags = this.getTags();
    return (
      <div className="Browser">
        <TagChooser tags={ tags } />
      </div>
    );
  }
}

export default Browser;
