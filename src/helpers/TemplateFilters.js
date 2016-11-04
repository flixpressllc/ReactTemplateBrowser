export default class TemplateFilters {
  constructor (filterObject, templatesArray) {
    this.filter = filterObject;
    this.allTemplates = templatesArray;
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

  filterBy (name, templates) {
    switch (name) {
      case 'plan':
        return this.filterByPlanName(templates);
      default:
        return this.filterByArbitrary(name, templates);
    }
  }
  
  filterByArbitrary (name, templates) {
    if (this.filter[name]) {
      templates = templates.filter( (template) => {
        return template[name].indexOf(this.filter[name]) !== -1;
      });
    }
    return templates;
  }

  filterByPlanName (templates) {
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

  setArbitraryFilter (name, data) {
    this.filter[name] = data;
    return this.filter;
  }

  setFilter (name, data) {
    switch (name) {
      default:
        return this.setArbitraryFilter(name, data);
    }
  }

  getFilter (name) {
    if (name && this.filter[name]) {
      return this.filter[name];
    }
    return this.filter;
  }
}
