import React from 'react';
import { mount } from 'enzyme';
import Browser from '../../src/components/Browser';
import { DEFAULT_PAGE_SIZE } from '../../src/stores/app-settings';
import create from '../spec-helpers';

describe('Feature: Users can navigate directly to a tag or template', () => {
  afterEach(() => {
    global.window.location.hash = '';
    global.window.location.search = '';
  })


  describe('when the url contains a tag name', () => {
    it('sets the chosen tag based on the url on page load', () => {
      const templates = [
        create('template', {name: 'Blue Template', tags:['Blue']}),
        create('template', {name: 'Red Template', tags:['Red']}),
      ];

      global.window.location.hash = '#red'; // This is not testable, to my current knowledge
      const app = mount(<Browser templates={ templates } />);

      expect(app.text()).toContain('Red Template');
      expect(app.text()).not.toContain('Blue Template');
    });

    it('sets the chosen tag based on the url as it is changed', () => {
      const templates = [
        create('template', {name: 'Blue Template', tags:['Blue']}),
        create('template', {name: 'Red Template', tags:['Red']}),
      ];
      const app = mount(<Browser templates={ templates } />);

      // The hashchange event is not testable, to my current knowledge
      global.window.location.hash = '#blue';
      // so I will fake it:
      app.instance().handleHashChange({newURL: '#blue'});

      expect(app.text()).not.toContain('Red Template');
      expect(app.text()).toContain('Blue Template');
    });
  });
  describe('when the url contains a template id', () => {
    it('opens the colorbox to that template', () => {
      const templates = [
        create('template', {id: 1, type: 'TextOnly'}),
        create('template'),
      ];
      const openTemplate = jest.fn( () => {} );
      const fakeGetUrlSearch = () => '?tid=1';
      const app = mount(<Browser templates={ templates } onTemplateOpen={ openTemplate } />);
      app.instance().getUrlSearch = fakeGetUrlSearch;

      app.instance().openQueriedTemplate();

      expect(openTemplate).toHaveBeenCalledWith(1, 'TextOnly');
    });

    it('navigates to a page with the given template', () => {
      let templates = []
      for (var i = 0; i < DEFAULT_PAGE_SIZE ; i++) {
        templates.push(create('template'));
      }
      templates.push(create('template', {id: 10001, name: 'My Special Template'}))
      const fakeGetUrlSearch = () => '?tid=10001';
      const app = mount(<Browser templates={ templates } />);
      app.instance().getUrlSearch = fakeGetUrlSearch;

      app.instance().navigateToQueriedTemplate();

      expect(app.text()).toContain('My Special Template');
    });
  });
});
