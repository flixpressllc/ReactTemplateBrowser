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
    return new Filter(this.state.filter, this.props.templates).runFilter(); 
  }

  handleCostTypeChange(newValue) {
    let templateOptions = this.state.templateOptions;
    templateOptions.costType = newValue;
    this.setState({
      templateOptions: templateOptions
    })
  }

  setFilterTagName(tagName) {
    let filter = new Filter(this.state.filter).setFilterTagName(tagName);
    this.setState({filter: filter});
  }

  setFilterPlanName(planName) {
    let filter = new Filter(this.state.filter).setFilterPlanName(planName);
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
