import React from 'react';
import { mount } from 'enzyme';
import Browser from '../../src/components/Browser';
import create from '../spec-helpers';

describe('Feature: Users can open templates', () => {
  it('calls the attached function with expected params', () => {
    const templates = [ 
      create('template', {id: 23, type: 'TextOnly'})
    ];
    const openTemplate = jest.fn( () => {} );
    const app = mount(<Browser templates={templates} onTemplateOpen={ openTemplate } />);
    
    app.find('Template').simulate('click');

    expect(openTemplate.mock.calls[0]).toEqual([23, 'TextOnly']);
  });

});
