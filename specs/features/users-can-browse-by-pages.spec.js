import React from 'react';
import { mount } from 'enzyme';
import Browser from '../../src/components/Browser';
import create from '../spec-helpers';

describe('Feature: Users can browse by pages', () => {
  it('shows 20 items at a time by default', () => {
    let templates = [];
    const numTemplates = 25
    for (var i = 0; i < numTemplates; i++) {
      templates.push( create('template') );
    }

    const app = mount(<Browser templates={ templates } />);

    expect(app.find('Template').length).toEqual(20);
  });

  it('can show a second page by clicking the next button', () => {
    let templates = [];
    const numTemplates = 25
    for (var i = 0; i < numTemplates; i++) {
      templates.push( create('template') );
    }
    const app = mount(<Browser templates={ templates } />);

    app.find('PaginationPane a[rel="next"]').at(0).simulate('click');

    expect(app.find('Template').length).toEqual(5);
  });

});
