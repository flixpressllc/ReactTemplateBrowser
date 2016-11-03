import React from 'react';
import { shallow, mount } from 'enzyme';
import Browser from './Browser';
import create from './test-data/FaketoryGirl';

it('renders without crashing', () => {
  mount(<Browser />);
});

it('creates a tag pane with the right number of nodes', () => {
  const templates = [ 
    create('template', {tags: ['one', 'two']}),
    create('template', {tags: ['one', 'two', 'three']})
  ];
  const app = mount(<Browser templates={templates} />);
  let nodeLength = app.find('TagPane a').length;
  
  expect(nodeLength).toBe(3);
});

it('changes displayed templates on tag click', () => {
  const templates = [ 
    create('template', {tags: ['green']}),
    create('template', {tags: ['red']})
  ];
  const app = mount(<Browser templates={ templates } />);
  const firstTag = app.find('TagPane a').first();

  firstTag.simulate('click');

  expect(app.find('Template').length).toBe(1);
});
