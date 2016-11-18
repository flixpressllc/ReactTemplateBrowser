import Sorter from '../../src/helpers/TemplateSorter';
import create from '../../specs/spec-helpers';

describe('Template Sorter:', () => {
  it('sorts by oldest first', () => {
    const templates = [ 
      create('template', {id: 3}),
      create('template', {id: 2}),
      create('template', {id: 5}),
      create('template', {id: 1}),
      create('template', {id: 4})
    ];

    let results = new Sorter('oldest', templates);

    results.forEach((result, i) => {
      expect(result.id).toBe(i + 1);
    });
  });
  
  it('sorts by newest first', () => {
    const templates = [ 
      create('template', {id: 3}),
      create('template', {id: 2}),
      create('template', {id: 5}),
      create('template', {id: 1}),
      create('template', {id: 4})
    ];
    const expectedSort = [5,4,3,2,1];

    let results = new Sorter('newest', templates);

    results.forEach((result, i) => {
      expect(result.id).toBe(expectedSort[i]);
    });
  });
  
  it('sorts by highest value first', () => {
    const templates = [ 
      create('template', {price: '$3'}),
      create('template', {price: '$2'}),
      create('template', {price: '$5'}),
      create('template', {price: '$1'}),
      create('template', {price: '$4'})
    ];
    const expectedSort = ['$5','$4','$3','$2','$1'];

    let results = new Sorter('highest-value', templates);

    results.forEach((result, i) => {
      expect(result.price).toEqual(expectedSort[i]);
    });
  });

  it('sorts by free first, then newest', () => {
    const templates = [ 
      create('template', {id: 3, plan: 'Free'}),
      create('template', {id: 2, plan: 'Business'}),
      create('template', {id: 5, plan: 'Free'}),
      create('template', {id: 1, plan: 'Personal'}),
      create('template', {id: 4, plan: 'Expert'})
    ];
    const expectedSort = [5, 3, 4, 2, 1];

    let results = new Sorter('free-first', templates);

    results.forEach((result, i) => {
      expect(result.id).toEqual(expectedSort[i]);
    });
  });
});
