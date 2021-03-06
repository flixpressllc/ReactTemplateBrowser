import React, { Component } from 'react';
import { union } from 'lodash';
import Filter from '../helpers/TemplateFilters';
import TemplateSorter from '../helpers/TemplateSorter';
import { PAYG_PLAN_NAMES, DEFAULT_PAGE_SIZE, ALL_PLAN_NAMES } from '../stores/app-settings';
import { clone } from '../helpers/ObjectHelpers';

import CostSwitch from './CostSwitch';
import TagPane from './TagPane';
import TemplatePane from './TemplatePane';
import PlanChooser from './PlanChooser';
import SortSelector from './SortSelector';
import PaginationPane from './PaginationPane';

import '../helpers/eventPolyfills';

import './Browser.css';

function determineCostType(userType, preferredCostType) {
  const userIsPAYG = PAYG_PLAN_NAMES.indexOf(userType) !== -1;
  const userIsGuest = ALL_PLAN_NAMES.indexOf(userType) === -1;
  const costTypes = ['price', 'plan'];
  const preferredIsAvailable = (costTypes.indexOf(preferredCostType) > -1);

  if (userIsGuest) {
    return preferredIsAvailable ? preferredCostType : 'plan';
  } else {
    return userIsPAYG ? 'price' : 'plan';
  }
}

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
    this.handleChooseTag = this.handleChooseTag.bind(this);
    this.handleHashChange = this.handleHashChange.bind(this);

    let possibleTag = window.location.hash.slice(1);
    this.filter.setTagFromSlug(possibleTag);
    if (this.filter.runFilter().length === 0) {
      window.location = '#all-templates';
      this.filter.setFilter('tags','');
    }

    this.state = {
      filter: this.filter.getFilter(),
      sortTemplatesBy: props.userType === 'Free' ? 'free-first' : 'newest',
      templateOptions: {
        costType: determineCostType(props.userType, props.preferredCostType)
      }
    };
  }

  componentWillMount () {
    window.addEventListener('hashchange', this.handleHashChange, false);
  }

  componentDidMount () {
    this.openQueriedTemplate();
    this.navigateToQueriedTemplate();
  }

  getUrlSearch () {
    return window.location.search;
  }

  getQueriedTemplate () {
    let id = this.getQueriedTemplateId();
    if (id === false) return false;
    let chosenTemplate = this.props.templates.filter( t => t.id === id )[0];
    if (chosenTemplate && chosenTemplate.type !== undefined) {
      return chosenTemplate;
    }
    return false;
  }

  getQueriedTemplateId () {
    let query = this.getUrlSearch().slice(1);
    let id = false;
    if (query.indexOf('tid=') !== -1) {
      id = parseInt(query.match(/tid=([0-9]+)/)[1], 10);
    }
    return id;
  }

  navigateToQueriedTemplate () {
    let filteredTemplates = this.getFilteredTemplates();
    let chosenTemplate = this.getQueriedTemplate();
    if (chosenTemplate === false) return;
    let templatePositionInArray = 0;
    filteredTemplates.map( (temp, i) => {
      if (temp.id === chosenTemplate.id) {
        templatePositionInArray = i;
      }
    });
    let pageNum = Math.ceil(templatePositionInArray / this.props.pageSize);
    this.setState({page: pageNum});
  }

  openQueriedTemplate () {
    let id = this.getQueriedTemplateId();
    let chosenTemplate = this.getQueriedTemplate();
    if (chosenTemplate) {
      this.props.onTemplateOpen(id, chosenTemplate.type);
    }
  }

  componentWillUnmount () {
    window.removeEventListener('hashchange', this.handleHashChange, false);
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

  handleChooseTag(tagName) {
    this.setFilterTagName(tagName);
  }

  handleGroupOpen (groupId) {
    this.preGroupState = {
      page: this.state.page,
      filter: this.state.filter,
      sortTemplatesBy: this.state.sortTemplatesBy
    };
    this.filter.setFilter('templateGroup', groupId);
    this.setState({page: 1});
  }

  handleGroupClose () {
    this.filter.setFilter('templateGroup', '');
    if (this.preGroupState) {
      this.setState(this.preGroupState, () => {this.preGroupState = undefined;});
    } else {
      this.setState({page: 1});
    }
  }

  handleHashChange (e) {
    let slug = e.newURL.slice(e.newURL.indexOf('#') + 1);
    this.setFilterTagNameFromSlug(slug);
  }

  handlePageChange (newPageData) {
    this.setState({page: newPageData.onPage});
  }

  setFilterTagName(tagName) {
    if (this.state.filter.tags === tagName) return;
    this.filter.setFilter('tags', tagName);
    this.setState({page: 1});
  }

  setFilterTagNameFromSlug(slug) {
    this.filter.setTagFromSlug(slug);
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
      costType={ this.state.templateOptions.costType } />
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
          chooseTag={ this.handleChooseTag }
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
          pageSize={ this.props.pageSize }
          numItems={ filteredTemplates.length }
          onChange={ this.handlePageChange }/>
      </div>
    );
  }
}

Browser.defaultProps = {
  templates: [],
  userType: 'guest',
  pageSize: DEFAULT_PAGE_SIZE
};

export default Browser;
