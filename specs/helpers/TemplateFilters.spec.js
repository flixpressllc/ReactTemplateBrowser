import Filter from '../../src/helpers/TemplateFilters';
import React from 'react';
import { mount } from 'enzyme';
import Browser from '../../src/components/Browser';
import create from '../spec-helpers/FaketoryGirl';

describe('Template Filters:', () => {
  it('filters with the given tag', () => {
    const templates = [ 
      create('template', {tags: ['green']}),
      create('template', {tags: ['red']}),
      create('template', {tags: ['red', 'green']}),
      create('template', {tags: ['blue', 'red']}),
      create('template', {tags: ['green', 'red']}),
    ];

    let results = new Filter({tags: 'green'}, templates).runFilter();

    expect(results.length).toBe(3);
    results.forEach((result) => {
      expect(result.tags).toContain('green');
    });
  });

  it('filters with the given plan name', () => {
    const templates = [ 
      create('template', {plan: 'Free'}),
      create('template', {plan: 'Personal'}),
      create('template', {plan: 'Expert'}),
      create('template', {plan: 'Business'}),
      create('template', {plan: 'Enterprise'}),
    ];

    let results = new Filter({plan: 'Expert'}, templates).runFilter();

    expect(results.length).toBe(3);
    results.forEach((result) => {
      // Reversed Expectation and Actual here!!!
      // Would not be necessary with a `.toBe(something).or(somethingElse)`
      expect(['Free','Personal','Expert']).toContain(result.plan);
    });
  });

});