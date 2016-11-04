export default class TemplateFilters {
  constructor (filterObject, templatesArray) {
    this.filter = filterObject;
    this.allTemplates = templatesArray;
  }

  filterBy (name, templates) {
    switch (name) {
      case 'plan':
        return this._filterByPlan(templates);
      default:
        return this._filterByArbitrary(name, templates);
    }
  }
  
  getFilter (name) {
    if (name && this.filter[name]) {
      return this.filter[name];
    }
    return this.filter;
  }

  runFilter () {
    let filteredTemplates = [].concat(this.allTemplates);
    let filter = this.filter;
    
    for (let name in this.filter) {
      if (!this.filter.hasOwnProperty(name)) { continue; }
      filteredTemplates = this.filterBy(name, filteredTemplates);
    }

    return filteredTemplates;
  }

  setFilter (name, data) {
    switch (name) {
      default:
        return this._setArbitraryFilter(name, data);
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

  _setArbitraryFilter (name, data) {
    this.filter[name] = data;
    return this.filter;
  }

}
