import React from 'react';
import { shallow, mount } from 'enzyme';
import PlanFilter from '../../src/components/PlanFilter';
import PLAN_NAMES from '../../src/stores/plans';

it('renders without crashing', () => {
 shallow(<PlanFilter />);
});

it('displays all plans', () => {
  const pane = shallow(<PlanFilter />);
  PLAN_NAMES.forEach( (value) => {
    expect(pane.text()).toContain(value);
  } )
});

it('reports an event when an option is clicked', () => {
  const choose = jest.fn();
  const pane = mount(<PlanFilter onChange={ choose } />);
  
  pane.find('select').at(0).simulate('change');

  expect(choose.mock.calls.length).toEqual(1);
});

it('identifies the chosen plan', () => {
  const choose = jest.fn();
  const pane = mount(<PlanFilter onChange={ choose } />);
  
  pane.find('option').at(1).simulate('change');

  expect(choose.mock.calls[0]).toEqual(['Personal']);
});

it('creates an "all" plan along side the other plans', () => {
  const pane = mount(<PlanFilter />);
  expect(pane.text()).toContain('All Plans');
});