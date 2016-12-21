import React from 'react';
import { mount } from 'enzyme';
import Browser from '../../src/components/Browser';
import create from '../spec-helpers';

describe('Feature: Users can sort the template list', () => {
  it('shows newest templates by default', () => {
    const templates = [
      create('template', {id: 1, name: 'Old Template'}),
      create('template', {id: 100, name: 'Cool new template'})
    ];
    const app = mount(<Browser templates={ templates } />);

    expect(app.find('Template').first().text()).toContain('Cool new template');
  });

  it('sorts by value', () => {
    const templates = [
      create('template', {id: 1, price: '$4', name: 'Lowest Price Temp'}),
      create('template', {id: 100, price: '$5', name: 'Highest Price Temp'})
    ];
    const lowestPriceSortEvent = {target: {value: 'lowest-value'}};
    const app = mount(<Browser templates={ templates } />);
    // not sure why 'SortSelector select' dosen't work
    const selectElement = app.find('select').at(0);

    selectElement.simulate('change', lowestPriceSortEvent);
    expect(app.find('Template').first().text()).toContain('Lowest Price Temp');
  });

});
