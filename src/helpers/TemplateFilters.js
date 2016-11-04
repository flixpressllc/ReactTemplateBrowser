export default class TemplateFilters {
  constructor (filterObject, templatesArray) {
    if (filterObject.tagName) {
      templatesArray = this.byTagName(filterObject.tagName, templatesArray)
    }
    if (filterObject.planName) {
      templatesArray = this.byPlanName(filterObject.planName, templatesArray)
    }

    return templatesArray;
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

}
