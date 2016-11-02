import React, { Component } from 'react';
import './Browser.css';
import TagChooser from './TagPane';
import { union } from 'lodash';
import TemplateItem from './TemplateItem';

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
    const templates = this.props.templates.map( (template, i) => {
      return(<TemplateItem key={`template-item-${i}`} item={ template } />)
    });

    

    return (
      <div className="Browser">
        <TagChooser tags={ tags } />
        
        <div className='templates'>
          { templates }
        </div>
      </div>
    );
  }
}

Browser.defaultProps = {
  templates: []
};

export default Browser;
