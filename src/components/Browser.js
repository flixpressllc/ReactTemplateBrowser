import React, { Component } from 'react';
import { union } from 'lodash';
import Filter from '../helpers/TemplateFilters';
import TemplateSorter from '../helpers/TemplateSorter';

import CostSwitch from './CostSwitch';
import TagPane from './TagPane';
import Template from './Template';
import PlanChooser from './PlanChooser';
import SortSelector from './SortSelector';
import PaginationPane from './PaginationPane';

import './Browser.css';

class Browser extends Component {

  constructor(props){
    super(props);

    this.filter = new Filter({}, props.templates);
    this.setFilterTagName = this.setFilterTagName.bind(this);
    this.handleCostTypeChange = this.handleCostTypeChange.bind(this);
    this.setFilterPlanName = this.setFilterPlanName.bind(this);
    this.sortTemplates = this.sortTemplates.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);

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
    let filteredTemplates = this.filter.runFilter();
    filteredTemplates = new TemplateSorter(this.state.sortTemplatesBy, filteredTemplates);
    return filteredTemplates;
  }

  handleCostTypeChange(newValue) {
    let templateOptions = this.state.templateOptions;
    templateOptions.costType = newValue;
    this.setState({
      templateOptions: templateOptions
    })
  }

  handlePageChange (newPageData) {
    this.setState({page: newPageData.onPage});
  }

  setFilterTagName(tagName) {
    this.filter.setFilter('tags', tagName);
    this.forceUpdate();
  }

  setFilterPlanName(planName) {
    this.filter.setFilter('plan', planName);
    this.forceUpdate();
  }

  sortTemplates (sortType) {
    this.setState({sortTemplatesBy: sortType});
  }

  render() {
    const tags = this.getTags();
    const filteredTemplates = this.getFilteredTemplates().map( (template, i) => {
      return(<Template key={`template-item-${i}`} template={ template } options={ this.state.templateOptions } />);
    });
    const page = this.state.page || 1;
    const templates = PaginationPane.paginate(filteredTemplates, page)

    return (
      <div className='reactTemplateBrowser-Browser browser'>
        <TagPane tags={ tags } chooseTag={ this.setFilterTagName } activeTag={ this.state.filter.tags } />
        
        <div className='reactTemplateBrowser-Browser-filterContainer'>
          <SortSelector onChange={ this.sortTemplates } value={ this.state.sortTemplatesBy } />
          <PlanChooser onChange={ this.setFilterPlanName } value={ this.state.templateOptions.planType } />
          <CostSwitch value={ this.state.templateOptions.costType } onChange={ this.handleCostTypeChange } />
        </div>
        
        <PaginationPane currentPage={ page } numItems={ filteredTemplates.length } onChange={ this.handlePageChange }/>
        
        <div className='reactTemplateBrowser-Browser-templateContainer'>
          { templates }
        </div>
        
        <PaginationPane currentPage={ page } numItems={ filteredTemplates.length } onChange={ this.handlePageChange }/>
      </div>
    );
  }
}

Browser.defaultProps = {
  templates: []
};

export default Browser;
