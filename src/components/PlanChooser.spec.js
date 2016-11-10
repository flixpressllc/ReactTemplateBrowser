import React from 'react';
import { shallow, mount } from 'enzyme';
import PlanChooser from './PlanChooser';
import { PLAN_NAMES_IN_ORDER } from '../../src/stores/app-settings';

it('renders without crashing', () => {
 shallow(<PlanChooser />);
});

it('displays all plans', () => {
  const pane = shallow(<PlanChooser />);
  PLAN_NAMES_IN_ORDER.forEach( (value) => {
    expect(pane.text()).toContain(value);
  } )
});

it('reports an event when an option is clicked', () => {
  const choose = jest.fn();
  const pane = mount(<PlanChooser onChange={ choose } />);
  
  pane.find('select').at(0).simulate('change');

  expect(choose.mock.calls.length).toEqual(1);
});

it('identifies the chosen plan', () => {
  const choose = jest.fn();
  const pane = mount(<PlanChooser onChange={ choose } />);
  
  pane.find('option').at(1).simulate('change');

  expect(choose.mock.calls[0]).toEqual(['Personal']);
});

it('creates an "all" plan along side the other plans', () => {
  const pane = mount(<PlanChooser />);
  expect(pane.text()).toContain('All Plans');
});