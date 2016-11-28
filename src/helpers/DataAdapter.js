import { padLeft } from '../helpers/StringHelpers';
import { unique } from '../helpers/ObjectHelpers';

const INDIVIDUAL_LINES_PATTERN = /[^\r\n]+/g;
const TEMPLATES_WITH_4K = [85,84,83,79,65,64,51,50];

class DataAdapter {
  
  constructor (tabSeparatedValues) {
    this.templateGroupIds = this._findTemplateGroupIds(tabSeparatedValues);
    this.templateGroupsArray = this._createTemplateGroupsArray(tabSeparatedValues);
    this.templatesArray = this._createTemplateObjectsArray(tabSeparatedValues);
  }

  getTemplates () {
    return this.templatesArray;
  }

  getTemplateGroups () {
    return this.templateGroupsArray;
  }

  _createTemplateGroupsArray (tabSeparatedValues) {
    let templateGroups = [];
    tabSeparatedValues.match(INDIVIDUAL_LINES_PATTERN).forEach( (line) => {
      let args = this._getParams(line);
      let tempId = parseInt(args[0], 10);
      if (this.templateGroupIds.indexOf(tempId) === -1) return;
      templateGroups.push(this._createGroup.apply(this, args));
    });
    return templateGroups;
  }
   
  _findTemplateGroupIds (tabSeparatedValues) {
    let gIds = [];
    tabSeparatedValues.match(INDIVIDUAL_LINES_PATTERN).forEach( (line) => {
      let args = this._getParams(line);
      let parentId = args[args.length - 1];
      if (parentId !== 'NULL') gIds.push(parseInt(parentId, 10));
    });
    return unique(gIds).sort( (a, b) => a - b );
  }
   
  _createTemplateObjectsArray (tabSeparatedValues) {
    let finalTemplates = [];
    tabSeparatedValues.match(INDIVIDUAL_LINES_PATTERN).forEach( (line) => {
      let args = this._getParams(line);
      let tempId = parseInt(args[0], 10);
      if (this.templateGroupIds.indexOf(tempId) !== -1) return;
      finalTemplates.push(this._createTemplate.apply(this, args));
    });
    return finalTemplates;
  }

  _getParams (line) {
    return line.match(/[^\t]+/g);
  }

  _createTemplate (id, name, priceInt, cat1, cat2, duration, plan, type, parentId) {
    duration = this._durString(duration);
    return {
      id: parseInt(id, 10),
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
      parentId: parseInt(parentId, 10)
    }
  };

  _createGroup (id, name, priceInt, cat1, cat2, duration, plan, type, parentId) {
    return {
      id: parseInt(id, 10),
      tags: [cat1, cat2],
      name: name,
      image: 'https://flixpress.com/tempImages/' + id + '.jpg',
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