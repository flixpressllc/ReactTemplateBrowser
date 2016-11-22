import { padLeft } from '../helpers/StringHelpers';

const INDIVIDUAL_LINES_PATTERN = /[^\r\n]+/g;
const TEMPLATES_WITH_4K = [85,84,83,79,65,64,51,50];

class DataAdapter {
   
   constructor (tabSeparatedValues) {
     this.templatesArray = this._create_list(tabSeparatedValues);
   }

   getList () {
     return this.templatesArray;
   }
   
   _create_list (tabSeparatedValues) {
    let finalTemplates = [];
    tabSeparatedValues.match(INDIVIDUAL_LINES_PATTERN).forEach(function(line) {
      let args = this._getParams(line);
      finalTemplates.push(this._createTemplate.apply(this, args));
    }, this);
    return finalTemplates;
  }

   _getParams (line) {
    return line.match(/[^\t]+/g);
  }

   _createTemplate (id, name, priceInt, cat1, cat2, duration, plan, type, parentId) {
    duration = this._durString(duration);
    return {
      id: id,
      tags: [cat1, cat2],
      name: name,
      type: type,
      image: 'https://flixpress.com/tempImages/' + id + '.jpg',
      duration: duration,
      plan: plan,
      price: '$' + priceInt,
      features: {
        has4k: this._has4k(id)
      },
      parent: parentId
    }
  };

   _has4k (id) {
    return TEMPLATES_WITH_4K.indexOf(parseInt(id,10)) !== -1;
  }

   _durString (string) {
    if (string.indexOf('econds') !== -1) {
      let numberString = string.split(' ')[0];
      return this._durToString(parseInt(numberString, 10));
    }
    return string.split(' ')[0];
  }

   _durToString (int) {
    var minutes = Math.floor(int / 60);
    var seconds = int % 60;
    return `${minutes}:${padLeft(seconds.toString(),'0',2)}`
  }

}

export default DataAdapter;