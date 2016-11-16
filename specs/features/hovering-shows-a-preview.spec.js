import React from 'react';
import { mount } from 'enzyme';
import TemplatePane from '../../src/components/TemplatePane';
import create from '../spec-helpers';

describe('Feature: Hovering on a template shows a preview', () => {
  it('shows a video when hovered', () => {
    const templates = [ 
      create('template', {id: 23})
    ];
    const openTemplate = jest.fn( () => {} );
    const app = mount(<TemplatePane templates={templates} />);
    
    app.setState({hoveredTemplate: 23});

    expect(app.find('video').length).toEqual(1);
  });

});
