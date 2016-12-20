import { clone, isEmpty } from './ObjectHelpers'

export default class TemplateFilters {
  constructor (templatesArray, filterObject) {
    this.allTemplates = clone(templatesArray);

    this.filter = {};
    if (isEmpty(filterObject)) {
      this.setFilter('plan', 'All Plans');
    } else {
      this.filter = clone(filterObject);
    }
  }

  getFilter (name) {
    if (name && this.filter[name]) {
      return this.filter[name];
    }
    return this.filter;
  }

  runFilter () {
    let filteredTemplates = clone(this.allTemplates);
    let filter = this.filter;

    for (let name in filter) {
      if (!filter.hasOwnProperty(name)) { continue; }
      filteredTemplates = this._filterBy(name, filteredTemplates);
    }

    return filteredTemplates;
  }

  setFilter (name, data) {
    switch (name) {
      default:
        return this._setArbitraryFilter(name, clone(data));
    }
  }

  _filterBy (name, templates) {
    switch (name) {
      case 'plan':
        return this._filterByPlan(templates);
      case 'templateGroup':
        return this._filterByTemplateGroup(templates);
      default:
        return this._filterByArbitrary(name, templates);
    }
  }

  _filterByArbitrary (name, templates) {
    if (this.filter[name]) {
      templates = templates.filter( (template) => {
        return template[name].indexOf(this.filter[name]) !== -1;
      });
    }
    return templates;
  }

  _filterByPlan (templates) {
    if (this.filter.plan) {
      let planValues = {
        'All Plans': 100,
        'Free': 0,
        'Personal': 1,
        'Expert': 2,
        'Business': 3,
        'Enterprise': 4
      };
      let filterValue = planValues[this.filter.plan];
      templates = templates.filter( (template) => {
        let thisTemplateValue = planValues[template.plan]
        return thisTemplateValue <= filterValue;
      });
    }
    return templates
  }

  _filterByTemplateGroup (templates) {
    if (this.filter.templateGroup) {
      const selectedGroup = templates.filter(template => template.id === this.filter.templateGroup)[0];
      return clone(selectedGroup.children);
    }
    return templates
  }

  _setArbitraryFilter (name, data) {
    this.filter[name] = data;
    return this.filter;
  }

}
