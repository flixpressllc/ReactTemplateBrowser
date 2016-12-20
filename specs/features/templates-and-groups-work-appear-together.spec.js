import React from 'react';
import { mount } from 'enzyme';
import Browser from '../../src/components/Browser';
import create from '../spec-helpers';
import { DEFAULT_PAGE_SIZE } from '../../src/stores/app-settings';

describe('Feature: Templates and groups appear and work together', () => {
  it(`shows the default ${ DEFAULT_PAGE_SIZE } items at a time by default`, () => {
    let templates = [];
    const numTemplates = DEFAULT_PAGE_SIZE + 1
    for (var i = 0; i < numTemplates; i++) {
      templates.push( create('template') );
    }

    const app = mount(<Browser templates={ templates } />);

    expect(app.find('Template').length).toEqual(DEFAULT_PAGE_SIZE);
  });

  it('displays templates and groups together', ()=>{
    const templates = [create('template'), create('template'),create('templateGroup')];

    const app = mount(<Browser templates={ templates } />);

    expect(app.find('TemplateGroup').length).toEqual(1);
    expect(app.find('Template').length).toEqual(2);
  });

  it('displays templates and groups in order', ()=>{
    const templates = [
      create('template', {id: 1}),
      create('template', {id: 3}),
      create('templateGroup', {id: 2})
    ];

    const app = mount(<Browser templates={ templates } />);
    const secondPaneItem = app.find('.reactTemplateBrowser-TemplatePane-paneItem').at(1);

    expect(secondPaneItem.find('TemplateGroup').length).toEqual(1);
  });

});
