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

    expect(app.find('.reactTemplateBrowser-Template-trialRibbon').length).toBe(2);
  });

  it('shows no ribbons for Pay As You Go users', () => {
    const templates = [
      create('template', {plan: 'Free'}),
      create('template', {plan: 'Personal'}),
      create('template', {plan: 'Expert'}),
      create('template', {plan: 'Business'}),
      create('template', {plan: 'Enterprise'})
    ];
    const app = mount(<Browser userType={'Pay As You Go'} templates={ templates } />);

    expect(app.find('.reactTemplateBrowser-Template-trialRibbon').length).toBe(0);
  });

  it('shows no ribbons for Pay As You Go: Reseller users', () => {
    const templates = [
      create('template', {plan: 'Free'}),
      create('template', {plan: 'Personal'}),
      create('template', {plan: 'Expert'}),
      create('template', {plan: 'Business'}),
      create('template', {plan: 'Enterprise'})
    ];
    const app = mount(<Browser userType={'Reseller'} templates={ templates } />);

    expect(app.find('.reactTemplateBrowser-Template-trialRibbon').length).toBe(0);
  });

  describe('Free-first sorting', () => {
    it('shows free-first sorting option to Free users', () => {
      const app = mount(<Browser userType={'Free'} />);

      let selectOptions = app.find('.reactTemplateBrowser-SortSelector option');
      let optionValues = [];
      for (var i = 0; i < selectOptions.length; i++) {
        optionValues.push(selectOptions.get(i).value);
      }

      expect(optionValues).toContain('free-first');
    });
    it('defaults to free-first sorting option for Free users', () => {
      const app = mount(<Browser userType={'Free'} />);

      expect(app.state().sortTemplatesBy).toEqual('free-first');
    });
    it('does not show free-first sorting option to non-free users', () => {
      const app = mount(<Browser userType={'Personal'} />);

      let selectOptions = app.find('.reactTemplateBrowser-SortSelector option');
      let optionValues = [];
      for (var i = 0; i < selectOptions.length; i++) {
        optionValues.push(selectOptions.get(i).value);
      }

      expect(optionValues).not.toContain('free-first');
    });
  });
});
