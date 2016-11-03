import React from 'react';
import { mount } from 'enzyme';
import Browser from '../../src/components/Browser';
import create from '../spec-helpers/FaketoryGirl';

it('creates a tag pane with the right number of nodes', () => {
  const templates = [ 
    create('template', {tags: ['one', 'two']}),
    create('template', {tags: ['one', 'two', 'three']})
  ];
  const app = mount(<Browser templates={templates} />);
  let nodeLength = app.find('TagPane .tag').length;
  
  expect(nodeLength).toBe(3);
});

it('changes displayed templates on tag click', () => {
  const templates = [ 
    create('template', {tags: ['green']}),
    create('template', {tags: ['red']})
  ];
  const app = mount(<Browser templates={ templates } />);
  const firstTag = app.find('TagPane .tag').at(1);

  firstTag.simulate('click');

  expect(app.find('Template').length).toBe(1);
});

it('displays all templates on "all" tag click', () => {
  const templates = [ 
    create('template', {tags: ['green']}),
    create('template', {tags: ['red']})
  ];
  const app = mount(<Browser templates={ templates } />);
  const firstTag = app.find('TagPane a.tag-all').first();

  firstTag.simulate('click');

  expect(app.find('Template').length).toBe(2);
});
