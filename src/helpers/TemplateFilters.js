export default class TemplateFilters {
  constructor (filterObject, templatesArray) {
    this.filter = filterObject;
    this.allTemplates = templatesArray;
  }

  runFilter () {
    let filteredTemplates = this.allTemplates;
    let filter = this.filter;
    
    if (filter.tagName) {
      filteredTemplates = this.byTagName(filter.tagName, filteredTemplates)
    }
    if (filter.planName) {
      filteredTemplates = this.byPlanName(filter.planName, filteredTemplates)
    }

    return filteredTemplates;
  }
  
  byTagName (tagName, templates) {
    return templates.filter( (template) => {
      return template.tags.indexOf(tagName) !== -1;
    });
  }

  byPlanName (planName, templates) {
    let planValues = {
      'All Plans': 100,
      'Free': 0,
      'Personal': 1,
      'Expert': 2,
      'Business': 3,
      'Enterprise': 4
    };
    let filterValue = planValues[planName];
    return templates.filter( (template) => {
      let thisTemplateValue = planValues[template.plan]
      return thisTemplateValue <= filterValue;
    });
  }

  setFilterTagName(tagName) {
    this.filter.tagName = tagName;
    return this.filter;
  }

  setFilterPlanName(planName) {
    this.filter.planName = planName;
    return this.filter;
  }


}
