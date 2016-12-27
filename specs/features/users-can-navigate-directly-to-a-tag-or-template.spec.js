import React from 'react';
import { mount } from 'enzyme';
import Browser from '../../src/components/Browser';
import create from '../spec-helpers';

describe('Feature: Users can navigate directly to a tag or template', () => {
  describe('when the url contains a tag name', () => {
    it('sets the chosen tag based on the url', () => {
      const templates = [
        create('template', {name: 'Blue Template', tags:['Blue']}),
        create('template', {name: 'Red Template', tags:['Red']}),
      ];
      const app = mount(<Browser templates={ templates } />);

      global.window.hash = '#red'; // This is not testable, to my current knowledge
      // so I will fake it:

      app.instance().handleHashChange({newURL: '#red'});

      expect(app.text()).toContain('Red Template');
      expect(app.text()).not.toContain('Blue Template');
    });
  });
  describe('when the url contains a template id', () => {
    it('shows a view containing that template and opens the colorbox to that template', () => {
      pending();
    });
  });
});
