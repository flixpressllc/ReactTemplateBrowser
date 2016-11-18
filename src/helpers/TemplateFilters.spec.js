import Filter from '../../src/helpers/TemplateFilters';
import create from '../../specs/spec-helpers';

describe('Template Filters:', () => {
  it('filters with the given tag', () => {
    const templates = [ 
      create('template', {tags: ['green']}),
      create('template', {tags: ['red']}),
      create('template', {tags: ['red', 'green']}),
      create('template', {tags: ['blue', 'red']}),
      create('template', {tags: ['green', 'red']}),
    ];

    let results = new Filter(templates, {tags: 'green'}).runFilter();

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

    let results = new Filter(templates, {plan: 'Expert'}).runFilter();

    expect(results.length).toBe(3);
    results.forEach((result) => {
      // Reversed Expectation and Actual here!!!
      // Would not be necessary with a `.toBe(something).or(somethingElse)`
      expect(['Free','Personal','Expert']).toContain(result.plan);
    });
  });

  it('defaults to All Plans if no initial filter is given', () => {
    const templates = [ create('template') ];

    const filter = new Filter(templates);

    expect(filter.getFilter()).toEqual({plan: 'All Plans'});
  });

});