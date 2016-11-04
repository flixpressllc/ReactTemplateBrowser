import React, { Component } from 'react';
import { union } from 'lodash';
import Filter from '../helpers/TemplateFilters';
import CostSwitch from './CostSwitch';
import TagPane from './TagPane';
import Template from './Template';
import PlanChooser from './PlanChooser';
import '../css/Browser.css';

class Browser extends Component {

  constructor(props){
    super(props);
    this.state = {
      filter: {},
      templateOptions: {
        costType: 'plan'
      }
    };

    this.setFilterTagName = this.setFilterTagName.bind(this);
    this.handleCostTypeChange = this.handleCostTypeChange.bind(this);
    this.setFilterPlanName = this.setFilterPlanName.bind(this);
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

  getFilteredTemplates() {
    const filter = this.state.filter;
    let filterableTemplates = this.props.templates;
    
    if (filter.tagName) {
      filterableTemplates = Filter.byTagName(filter.tagName, filterableTemplates);
    }
    if (filter.planName) {
      filterableTemplates = Filter.byPlanName(filter.planName, filterableTemplates);
    }
    
    return filterableTemplates;
  }

  handleCostTypeChange(newValue) {
    let templateOptions = this.state.templateOptions;
    templateOptions.costType = newValue;
    this.setState({
      templateOptions: templateOptions
    })
  }

  setFilterTagName(tagName) {
    let filter = this.state.filter;
    filter.tagName = tagName;
    this.setState({filter: filter});
  }

  setFilterPlanName(planName) {
    let filter = this.state.filter;
    filter.planName = planName;
    this.setState({filter: filter});
  }

  render() {
    const tags = this.getTags();
    const templates = this.getFilteredTemplates().map( (template, i) => {
      return(<Template key={`template-item-${i}`} template={ template } options={ this.state.templateOptions } />);
    });

    return (
      <div className="browser">
        <TagPane tags={ tags } chooseTag={ this.setFilterTagName } />
        <CostSwitch value={ this.state.templateOptions.costType } onChange={ this.handleCostTypeChange } />
        <PlanChooser onChange={ this.setFilterPlanName } value={ this.state.templateOptions.planType } />
        
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
