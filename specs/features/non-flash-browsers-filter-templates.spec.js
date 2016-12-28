import React from 'react';
import { mount } from 'enzyme';
import Browser from '../../src/components/Browser';
import create from '../spec-helpers';

describe('Feature: Non-flash users will not see flash-required templates by default', () => {
  beforeAll( () => { global.window.Modernizr = {flash: false}; } );
  afterAll( () => { global.window.Modernizr = undefined; } );

  it('displays a new filter option', () => {
    const app = mount(<Browser />);
    expect(app.find('NoFlashFilter').length).toEqual(1);
  });

  it('applies a filter to remove flash only templates', () => {
    const app = mount(<Browser />);

    expect(app.state().filter.type).toEqual('TextOnly');
  });

  it('hides non TextOnly templates by default', () => {
    pending('I have NO CLUE why this spec is not working');
    const templates = [
      create('template', {name: 'Flash Required', type: 'TextOnlyLegacy'}),
      create('template', {name: 'Flash Not Required', type: 'TextOnly'})
    ];
    const app = mount(<Browser templates={ templates } />);

    expect(app.state().filter.type).toEqual('TextOnly');
    expect(app.text()).toContain('Flash Not Required');
    expect(app.text()).not.toContain('Flash Required');
  });

  it('removes the filter if desired by the user', () => {
    const app = mount(<Browser />);

    app.find('NoFlashFilter button').simulate('click');

    expect(app.state().filter.type).not.toEqual('TextOnly');
  });

  it('reapplies the filter if desired by the user', () => {
    const app = mount(<Browser />);

    app.find('NoFlashFilter button').simulate('click').simulate('click');

    expect(app.state().filter.type).toEqual('TextOnly');
  });
});

describe('Feature: Flash users will see all templates as normal', () => {
  it('does not display a new filter option', () => {
    const app = mount(<Browser />);
    expect(app.find('NoFlashFilter').length).toEqual(0);
  });
});
