import { clone } from './ObjectHelpers'

export default class TemplateSorter {
  constructor (sortType, templatesArray) {
    this.allTemplates = clone(templatesArray);
    
    switch (sortType) {
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

  _newest () {
    return this.allTemplates.sort( (a, b) => {
      if (parseInt(a.id, 10) > parseInt(b.id, 10)) {
        return -1;
      } else {
        return 1;
      }
    });
  }

  _highestValue () {
    return this.allTemplates.sort( (a, b) => {
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
