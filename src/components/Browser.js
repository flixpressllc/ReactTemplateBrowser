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

    this.filter = new Filter({}, props.templates);
    this.setFilterTagName = this.setFilterTagName.bind(this);
    this.handleCostTypeChange = this.handleCostTypeChange.bind(this);
    this.setFilterPlanName = this.setFilterPlanName.bind(this);

    this.state = {
      filter: this.filter.getFilter(),
      templateOptions: {
        costType: 'plan'
      }
    };
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
    return this.filter.runFilter(); 
  }

  handleCostTypeChange(newValue) {
    let templateOptions = this.state.templateOptions;
    templateOptions.costType = newValue;
    this.setState({
      templateOptions: templateOptions
    })
  }

  setFilterTagName(tagName) {
    this.filter.setFilter('tags', tagName);
    this.forceUpdate();
  }

  setFilterPlanName(planName) {
    this.filter.setFilter('plan', planName);
    this.forceUpdate();
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
