import React from 'react';
import { mount } from 'enzyme';
import Browser from '../../src/components/Browser';
import create from '../spec-helpers';

describe('Feature: Users can browse with filters', () => {
  describe('while logged out', () => {
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

    it('changes displayed templates by plan choice', () => {
      const templates = [ 
        create('template', {plan: 'Personal'}),
        create('template', {plan: 'Expert'})
      ];
      const expertEvent = {target: {value: 'Expert'}};
      const personalEvent = {target: {value: 'Personal'}}
      const app = mount(<Browser templates={ templates } />);
      // not sure why 'SortSelector select' dosen't work
      const selectElement = app.find('select').at(1);

      selectElement.simulate('change', expertEvent);
      expect(app.find('Template').length).toEqual(2);

      selectElement.simulate('change', personalEvent);
      expect(app.find('Template').length).toEqual(1);
    });
  });

  describe('while logged in', () => {
    pending();
  });
});
