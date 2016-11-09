import React from 'react';
import { mount } from 'enzyme';
import Browser from '../../src/components/Browser';
import create from '../spec-helpers';

describe('Feature: Users can browse by pages', () => {
  it('shows 12 items at a time by default', () => {
    const templates = [ 
      create('template'),
      create('template'),
      create('template'),
      create('template'),
      create('template'),
      create('template'),
      create('template'),
      create('template'),
      create('template'),
      create('template'),
      create('template'),
      create('template'),
      create('template'),
    ];
    const app = mount(<Browser templates={ templates } />);

    expect(app.find('Template').length).toEqual(12);
  });

  it('can show a second page by clicking the next button', () => {
    const templates = [ 
      create('template'),
      create('template'),
      create('template'),
      create('template'),
      create('template'),
      create('template'),
      create('template'),
      create('template'),
      create('template'),
      create('template'),
      create('template'),
      create('template'),
      create('template'),
    ];
    const app = mount(<Browser templates={ templates } />);

    app.find('PaginationPane a[rel="next"]').at(0).simulate('click');

    expect(app.find('Template').length).toEqual(1);
  });

});
