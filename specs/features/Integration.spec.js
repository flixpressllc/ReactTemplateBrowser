import React from 'react';
import { shallow, mount } from 'enzyme';
import Browser from '../../src/components/Browser';
import create from '../spec-helpers/FaketoryGirl';

it('renders without crashing', () => {
  mount(<Browser />);
});

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

it('changes displayed cost structure on switch click', () => {
  const templates = [ 
    create('template', {price: '$45', plan: 'Personal'})
  ];
  const app = mount(<Browser templates={ templates } />);
  const pricesSwitch = app.find('CostSwitch [value="price"]');
  const plansSwitch = app.find('CostSwitch [value="plan"]');

  pricesSwitch.simulate('change');
  expect(app.find('Template').first().text()).toContain('$45');

  plansSwitch.simulate('change');
  expect(app.find('Template').first().text()).toContain('Personal');
});
