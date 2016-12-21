import React from 'react';
import { mount } from 'enzyme';
import Browser from '../../src/components/Browser';
import create from '../spec-helpers';
import { DEFAULT_PAGE_SIZE } from '../../src/stores/app-settings';

describe('Feature: Templates and groups appear and work together', () => {
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

  it('displays children on TemplateGroup click', () => {
    const templates = [
      create('template', {id:1}),
      create('templateGroup', {id:2, children: [
        create('template', {id:3, parentId: 2}),
        create('template', {id:4, parentId: 2}),
        create('template', {id:5, parentId: 2})
      ]}),
    ]

    const app = mount(<Browser templates={ templates } />);
    app.find('TemplateGroup').simulate('click');

    expect(app.find('TemplateGroup').length).toEqual(0);
    expect(app.find('Template').length).toEqual(3);
  });

  it('displays all templates again on group exit', () => {
    const templates = [
      create('template', {id:1}),
      create('templateGroup', {id:2, children: [
        create('template', {id:3, parentId: 2}),
        create('template', {id:4, parentId: 2}),
        create('template', {id:5, parentId: 2})
      ]}),
    ]

    const app = mount(<Browser templates={ templates } />);
    app.find('TemplateGroup').simulate('click');
    app.find('.reactTemplateBrowser-Browser-groupEscape button').simulate('click');

    expect(app.find('Template').length).toEqual(1);
    expect(app.find('TemplateGroup').length).toEqual(1);
  });

});
