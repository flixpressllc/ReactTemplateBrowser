import React from 'react';
import { mount } from 'enzyme';
import Browser from '../../src/components/Browser';
import create from '../spec-helpers';
import { DEFAULT_PAGE_SIZE } from '../../src/stores/app-settings';

describe('Feature: Logged in users see the correct templates', () => {
  it('shows a trial ribbon on proper templates', () => {
    const templates = [
      create('template', {plan: 'Free'}),
      create('template', {plan: 'Personal'}),
      create('template', {plan: 'Expert'}),
      create('template', {plan: 'Business'}),
      create('template', {plan: 'Enterprise'})
    ];
    const app = mount(<Browser userType={'Free'} templates={ templates } />);

    expect(app.find('.reactTemplateBrowser-Template-trialRibbon').length).toBe(1);
  });

  it('shows no ribbons for Pay As You Go users', () => {
    const templates = [
      create('template', {plan: 'Free'}),
      create('template', {plan: 'Personal'}),
      create('template', {plan: 'Expert'}),
      create('template', {plan: 'Business'}),
      create('template', {plan: 'Enterprise'})
    ];
    const app = mount(<Browser userType={'PAYG'} templates={ templates } />);

    expect(app.find('.reactTemplateBrowser-Template-trialRibbon').length).toBe(0);
  });

  
});
