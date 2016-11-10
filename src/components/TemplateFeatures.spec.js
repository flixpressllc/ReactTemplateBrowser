import React from 'react';
import { shallow, mount } from 'enzyme';
import TemplateFeatures from './TemplateFeatures';
import { UHD_IMAGE_URL } from '../../src/stores/app-settings';
import create from '../../specs/spec-helpers';

it('renders without crashing', () => {
  shallow(<TemplateFeatures/>);
});

it('renders children passed in', () => {
  const component = mount(<TemplateFeatures>
    <span>hello out there</span>
    </TemplateFeatures>);
  
  expect(component.text()).toContain('hello out there');
});

describe('displaying 4k badge', () => {
  it('displays an image for 4K templates', () => {
    let templateObject = create('template', {features: {has4k: true}});
    
    const component = mount(<TemplateFeatures features={ templateObject.features } />);

    expect(component.find('img').first().prop('src')).toBe(UHD_IMAGE_URL);
  });
  it('displays no image for non-4K templates', () => {
    let templateObject = create('template', {features: {has4k: false}});
    
    const component = mount(<TemplateFeatures features={ templateObject.features } />);

    let images = component.find('img');
    for (let i = images.length; i > 0; i--) {
      expect(images.at(i).prop('src')).not.toBe(UHD_IMAGE_URL);
    }
  });
  it('hides badges when asked', () => {
    let templateObject = create('template', {features: {has4k: true}});
    
    const component = mount(<TemplateFeatures features={ templateObject.features } hideBadges={ true } />);

    expect(component.find('img').length).toBe(0);
  });
});
