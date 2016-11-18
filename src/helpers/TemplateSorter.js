import { clone } from './ObjectHelpers';

export default class TemplateSorter {
  constructor (sortType, templatesArray) {
    this.allTemplates = clone(templatesArray);
    
    switch (sortType) {
      case 'free-first':
        return this._freeFirst();
      case 'highest-value':
        return this._highestValue();
      case 'lowest-value':
        return this._highestValue().reverse();
      case 'oldest':
        return this._newest().reverse();
      case 'newest':
      default:
        return this._newest();
    }
  }

  _freeFirst (templateSubset) {
    let templates = templateSubset ? templateSubset : this.allTemplates;
    let freeTemplates = templates.filter( (template) => { return template.plan === 'Free'});
    let paidTemplates = templates.filter( (template) => { return template.plan !== 'Free'});
    return [].concat(this._newest(freeTemplates), this._newest(paidTemplates));
  }

  _newest (templateSubset) {
    let templates = templateSubset ? templateSubset : this.allTemplates;
    return templates.sort( (a, b) => {
      if (parseInt(a.id, 10) > parseInt(b.id, 10)) {
        return -1;
      } else {
        return 1;
      }
    });
  }

  _highestValue (templateSubset) {
    let templates = templateSubset ? templateSubset : this.allTemplates;
    return templates.sort( (a, b) => {
      let prep = function(stringVal) {
        return parseInt(stringVal.replace('$',''), 10);
      }

      a = prep(a.price);
      b = prep(b.price);

      if (a === b) {
        return 0;
      } else if (a < b) {
        return 1;
      } else {
        return -1;
      }
    });
  }

  static getSortList () {
    return clone([{
      name: 'Free First',
      value: 'free-first'
    },{
      name: 'Newest First',
      value: 'newest'
    },{
      name: 'Oldest First',
      value: 'oldest'
    },{
      name: 'Highest Value First',
      value: 'highest-value'
    },{
      name: 'Lowest Value First',
      value: 'lowest-value'
    }]);
  }
}
