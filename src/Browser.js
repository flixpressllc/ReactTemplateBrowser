import React, { Component } from 'react';
import './Browser.css';
import TagPane from './TagPane';
import { union } from 'lodash';
import TemplateItem from './TemplateItem';

class Browser extends Component {

  constructor(props){
    super(props);
    this.state = {
      filter: {}
    };

    this.setFilterTagName = this.setFilterTagName.bind(this);
  }

  getTags() {
    const templates = this.props.templates;
    if (templates === undefined) return undefined;
    let tagNames = [];
    templates.forEach( (template) =>{
      tagNames = union(tagNames, template.tags);
    });
    return tagNames;
  }

  filterByTagName(tagName, templates) {
    return templates.filter( (template) => {
      return template.tags.indexOf(tagName) !== -1;
    });
  }
  
  getFilteredTemplates() {
    const filter = this.state.filter;
    let filterableTemplates = this.props.templates;
    
    if (filter.tagName) {
      filterableTemplates = this.filterByTagName(filter.tagName, filterableTemplates);
    }
    
    return filterableTemplates;
  }

  setFilterTagName(tagName) {
    let filter = this.state.filter;
    filter.tagName = tagName;
    this.setState({filter: filter});
  }

  render() {
    const tags = this.getTags();
    const templates = this.getFilteredTemplates().map( (template, i) => {
      return(<TemplateItem key={`template-item-${i}`} item={ template } />);
    });

    return (
      <div className="Browser">
        <TagPane tags={ tags } chooseTag={ this.setFilterTagName } />
        
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
