import React from 'react';
import { mount, render } from 'enzyme';
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

  it('returns to previous state after exititng a group', () => {
    let templates = [];
    for (var i = 0; i < DEFAULT_PAGE_SIZE; i++) {
      templates.push( create('template', {plan: 'Free'}) );
    }
    templates.push(create('templateGroup', {id: 204, plan: 'Free', children: [
      create('template', {parentId: 204}),
      create('template', {parentId: 204}),
      create('template', {parentId: 204})
    ]}));
    const app = mount(<Browser templates={ templates } />);

    // Sort by oldest first
    const sortSelectorSelect = app.find('.reactTemplateBrowser-SortSelector select').at(0);
    sortSelectorSelect.simulate('change', {target: {value: 'oldest'}});
    // Show free plan templates only
    const planChooserSelect = app.find('.reactTemplateBrowser-PlanChooser select').at(0);
    planChooserSelect.simulate('change', {target: {value: 'Free'}});
    // Enter a group
    app.find('PaginationPane [rel="next"]').at(0).simulate('click');
    app.find('TemplateGroup').simulate('click');
    // Leave Group
    app.find('.reactTemplateBrowser-Browser-groupEscape button').simulate('click');

    expect(app.state().page).toEqual(2);
    expect(app.state().sortTemplatesBy).toEqual('oldest');
    expect(app.state().filter.plan).toEqual('Free');
  });

  it('selecting a tag exits the group', () => {
    const templates = [
      create('template', {tags: ['Monkey']}),
      create('template'),
      create('templateGroup', {id:45, children: [
        create('template'),
        create('template')
      ]})
    ]
    const app = mount(<Browser templates={ templates } />);
    app.find('TemplateGroup').simulate('click');
    app.find('.reactTemplateBrowser-TagPane-tag').last().simulate('click');

    expect(app.find('Template').length).toEqual(1);
  });
});
