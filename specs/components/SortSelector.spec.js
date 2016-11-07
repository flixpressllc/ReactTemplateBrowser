import React from 'react';
import { shallow, mount } from 'enzyme';
import SortSelector from '../../src/components/SortSelector';

it('renders without crashing', () => {
  shallow(<SortSelector />);
});

it('reports an event when an option is clicked', () => {
  const choose = jest.fn();
  const pane = mount(<SortSelector onChange={ choose } />);
  
  pane.find('select').at(0).simulate('change');

  expect(choose.mock.calls.length).toEqual(1);
});

it('identifies the chosen sort type', () => {
  const choose = jest.fn();
  const pane = mount(<SortSelector onChange={ choose } />);
  
  pane.find('option[value="oldest"]').at(0).simulate('change');

  expect(choose.mock.calls[0]).toEqual(['oldest']);
});
