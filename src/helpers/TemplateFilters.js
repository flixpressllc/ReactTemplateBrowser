export default class TemplateFilters {
  constructor (filterObject, templatesArray) {
    this.filter = filterObject;
    this.allTemplates = templatesArray;
  }

  runFilter () {
    let filteredTemplates = this.allTemplates;
    let filter = this.filter;
    
    filteredTemplates = this.filterByTagName(filteredTemplates)
    filteredTemplates = this.filterByPlanName(filteredTemplates)

    return filteredTemplates;
  }
  
  filterByTagName (templates) {
    if (this.filter.tagName) {
      templates = templates.filter( (template) => {
        return template.tags.indexOf(this.filter.tagName) !== -1;
      });
    }
    return templates;
  }

  filterByPlanName (templates) {
    if (this.filter.planName) {
      let planValues = {
        'All Plans': 100,
        'Free': 0,
        'Personal': 1,
        'Expert': 2,
        'Business': 3,
        'Enterprise': 4
      };
      let filterValue = planValues[this.filter.planName];
      templates = templates.filter( (template) => {
        let thisTemplateValue = planValues[template.plan]
        return thisTemplateValue <= filterValue;
      });
    }
    return templates
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
