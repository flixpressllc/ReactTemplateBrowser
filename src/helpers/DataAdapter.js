import { padLeft } from '../helpers/StringHelpers';
import { unique, clone } from '../helpers/ObjectHelpers';

const INDIVIDUAL_LINES_PATTERN = /[^\r\n]+/g;
const TEMPLATES_WITH_4K = [85,84,83,79,65,64,51,50];

class DataAdapter {

  constructor (tabSeparatedValues) {
    this.templateGroupIds = this._findTemplateGroupIds(tabSeparatedValues);
    this.templateGroupsArray = this._createTemplateGroupsArray(tabSeparatedValues);
    this.templatesArray = this._createTemplateObjectsArray(tabSeparatedValues);

    this.templateGroupsArray = this._addChildrenToGroups(this.templateGroupsArray);
  }

  getAll () {
    return this.getTemplates().concat(this.getTemplateGroups());
  }

  getTemplates () {
    return this._getTemplatesWithoutParents();
  }

  getTemplateGroups () {
    return this._getGroupsIncludingChildren();
  }

  _getTemplatesWithoutParents () {
    return clone(this.templatesArray.filter(temp => temp.parentId === undefined ));
  }

  _getTemplatesWithParents () {
    return clone(this.templatesArray.filter(temp => temp.id !== undefined ));
  }

  _addChildrenToGroups (originalGroups) {
    let templates = this._getTemplatesWithParents();
    let groups = clone(originalGroups);
    return groups.map(group => {
      let children = [];
      templates = templates.reduce((prev, template) => {
        if (template.parentId === group.id) {
          children.push(template.id);
          return prev;
        } else {
          return prev.concat([template]);
        }
      }, []);
      group.children = children;
      return group;
    });
  }

  _getGroupsIncludingChildren () {
    let groups = clone(this.templateGroupsArray);
    return groups.map(group => {
      group.children = group.children.map((childId => {
        return this._getTemplateById(childId);
      }));
      return group;
    });
  }

  _getTemplateById (id) {
    for (let i = 0; i < this.templatesArray.length; i++) {
      if (this.templatesArray[i].id === id) return clone(this.templatesArray[i]);
    }
    return undefined;
  }

  _createTemplateGroupsArray (tabSeparatedValues) {
    let templateGroups = [];
    tabSeparatedValues.match(INDIVIDUAL_LINES_PATTERN).forEach( (line) => {
      let args = this._getParams(line);
      let tempId = parseInt(args[0], 10);
      if (this.templateGroupIds.indexOf(tempId) === -1) return;
      templateGroups.push(this._createGroup(...args));
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
      finalTemplates.push(this._createTemplate(...args));
    });
    return finalTemplates;
  }

  _getParams (line) {
    return line.match(/[^\t]+/g);
  }

  _createTemplate (id, name, priceInt, cat1, cat2, duration, plan, type, parentId) {
    let template =  {
      id: parseInt(id, 10),
      tags: [cat1, cat2],
      name: name,
      type: type,
      image: 'https://flixpress.com/tempImages/' + id + '.jpg',
      duration: this._durString(duration),
      plan: plan,
      price: '$' + priceInt,
      features: {
        has4k: this._has4k(id)
      }
    }

    const pid = parseInt(parentId, 10);
    if (!isNaN(pid)) {
      template['parentId'] = pid;
    }

    return template;
  };

  _createGroup (id, name, priceInt, cat1, cat2, duration, plan, type, parentId) {
    return {
      id: parseInt(id, 10),
      tags: [cat1, cat2],
      name: name,
      image: 'https://flixpress.com/tempImages/' + id + '.jpg',
      type: type,
      image: 'https://flixpress.com/tempImages/' + id + '.jpg',
      duration: this._durString(duration),
      plan: plan,
      price: '$' + priceInt,
      features: {
        has4k: this._has4k(id)
      },
      children: []
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