import React from 'react';
import { mount } from 'enzyme';
import Browser from '../../src/components/Browser';
import create from '../spec-helpers/FaketoryGirl';

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
