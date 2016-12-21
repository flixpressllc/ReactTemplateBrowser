import React, { Component } from 'react';
import { union } from 'lodash';
import Filter from '../helpers/TemplateFilters';
import TemplateSorter from '../helpers/TemplateSorter';
import { PAYG_PLAN_NAMES } from '../stores/app-settings';

import CostSwitch from './CostSwitch';
import TagPane from './TagPane';
import TemplatePane from './TemplatePane';
import PlanChooser from './PlanChooser';
import SortSelector from './SortSelector';
import PaginationPane from './PaginationPane';

import './Browser.css';

class Browser extends Component {

  constructor(props){
    super(props);

    this.filter = new Filter(props.templates);
    this.setFilterTagName = this.setFilterTagName.bind(this);
    this.handleCostTypeChange = this.handleCostTypeChange.bind(this);
    this.setFilterPlanName = this.setFilterPlanName.bind(this);
    this.sortTemplates = this.sortTemplates.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleGroupOpen = this.handleGroupOpen.bind(this);
    this.handleGroupClose = this.handleGroupClose.bind(this);

    const userIsPAYG = PAYG_PLAN_NAMES.indexOf(props.userType) !== -1;

    this.state = {
      filter: this.filter.getFilter(),
      sortTemplatesBy: props.userType === 'Free' ? 'free-first' : 'newest',
      templateOptions: {
        costType: userIsPAYG ? 'price' : 'plan'
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

  handleGroupOpen (groupId) {
    this.filter.setFilter('templateGroup', groupId);
    this.setState({page: 1});
  }

  handleGroupClose () {
    this.filter.setFilter('templateGroup', '');
    this.setState({page: 1});
  }

  handlePageChange (newPageData) {
    this.setState({page: newPageData.onPage});
  }

  setFilterTagName(tagName) {
    this.filter.setFilter('tags', tagName);
    this.setState({page: 1});
  }

  setFilterPlanName(planName) {
    this.filter.setFilter('plan', planName);
    this.setState({page: 1});
  }

  sortTemplates (sortType) {
    this.setState({sortTemplatesBy: sortType});
  }

  renderCostSwitch () {
    if (this.props.userType !== 'guest') {return null}
    return <CostSwitch
      onChange={ this.handleCostTypeChange }
      value={ this.state.templateOptions.costType } />
  }

  renderSortSelectorOrGroupEscape () {
    if ( ! this.state.filter.templateGroup) {
      return [
        <SortSelector
          key="sort"
          onChange={ this.sortTemplates }
          userType={ this.props.userType }
          value={ this.state.sortTemplatesBy } />,
        <PlanChooser
          key="plan"
          onChange={ this.setFilterPlanName }
          value={ this.state.filter.plan } />
      ];
    } else {
      return (
        <div className="reactTemplateBrowser-Browser-groupEscape">
          <button type="button" onClick={ this.handleGroupClose } >Back to All Templates</button>
        </div>
      );
    }
  }

  render() {
    const tags = this.getTags();
    const filteredTemplates = this.getFilteredTemplates();
    const page = this.state.page || 1;
    const templates = PaginationPane.paginate(filteredTemplates, page)
    const costSwitch = this.renderCostSwitch();
    const sortAndPlanOrEscape = this.renderSortSelectorOrGroupEscape();

    return (
      <div className='reactTemplateBrowser-Browser browser'>
        <TagPane
          tags={ tags }
          chooseTag={ this.setFilterTagName }
          activeTag={ this.state.filter.tags } />

        <div className='reactTemplateBrowser-Browser-filterContainer'>
          { sortAndPlanOrEscape }
          { costSwitch }
        </div>

        <PaginationPane
          currentPage={ page }
          numItems={ filteredTemplates.length }
          onChange={ this.handlePageChange }/>

        <TemplatePane
          templates={ templates }
          userType={this.props.userType}
          hoveredTemplate={ this.state.hoveredTemplate }
          onHoveredTemplateChange={ this.handleHoveredTemplateChange }
          templateOptions={ this.state.templateOptions }
          onGroupOpen={ this.handleGroupOpen }
          onTemplateOpen={ this.props.onTemplateOpen } />

        <PaginationPane
          currentPage={ page }
          numItems={ filteredTemplates.length }
          onChange={ this.handlePageChange }/>
      </div>
    );
  }
}

Browser.defaultProps = {
  templates: [],
  userType: 'guest'
};

export default Browser;
