import React from 'react';
import { shallow, mount } from 'enzyme';
import Template from '../../src/components/Template';
import create from '../spec-helpers/FaketoryGirl';

it('renders without crashing', () => {
 shallow(<Template template={ create('template') } />);
});

it('renders the template name', () => {
  let templateObject = create('template');
  templateObject.name = 'Sparky'
  
  const component = shallow(<Template template={ templateObject } />)
  
  expect(component.text()).toContain('Sparky');
});

it('creates a correctly formatted link', () => {
  let templateObject = create('template', {id: 79, type: 'Slides'});
  
  const component = shallow(<Template template={ templateObject } />);

  expect(component.find('a').first().prop('href')).toBe('/templates/Slides.aspx?tid=79');
});

it('displays an image thumbnail', () => {
  let templateObject = create('template', {image: 'an/image.jpg'});
  
  const component = shallow(<Template template={ templateObject } />);

  expect(component.find('img').first().prop('src')).toBe('an/image.jpg');
});

it('displays the duration', () => {
  let templateObject = create('template', {duration: '1:00'});
  
  const component = shallow(<Template template={ templateObject } />);

  expect(component.text()).toContain('1:00');
});

describe('when asked, ', () => {
  it('displays the lowest plan it is in', () => {
    let templateObject = create('template', {plan: 'Personal', price: '$30'});
    let opts = { costType: 'plan' }
    
    const component = shallow(<Template template={ templateObject } options={ opts } />);

    expect(component.text()).toContain('Personal');
    expect(component.text()).not.toContain('$30');
  });

  it('displays the price', () => {
    let templateObject = create('template', {plan: 'Personal', price: '$25'});
    let opts = { costType: 'price' }
    
    const component = shallow(<Template template={ templateObject } options={ opts } />);

    expect(component.text()).toContain('$25');
    expect(component.text()).not.toContain('Personal');
  });
});

describe('hover interactions', () => {
  it('changes the title to a message on hover', () => {
    const template = create('template');
    const component = shallow(<Template template={ template } />);

    component.simulate('mouseEnter');

    expect(component.text()).toContain('Click to');
    expect(component.text()).not.toContain('ID:');
  });

  it('changes the image to a video on hover', () => {
    const template = create('template');
    const component = shallow(<Template template={ template } />);

    component.simulate('mouseEnter');

    expect(component.find('video').length).toEqual(1);
  });

  it('displays loading feedback before video plays', () => {
    const template = create('template');
    const component = mount(<Template template={ template } />);
    component.simulate('mouseEnter');

    component.find('video').simulate('loadstart');
    
    expect(component.find('.reactTemplateBrowser-LoadingSpinner-spinner').length).toEqual(1);
  });

  it('removes loading spinner when video plays', () => {
    const template = create('template');
    const component = mount(<Template template={ template } />);
    component.simulate('mouseEnter');
    
    component.find('video').simulate('loadstart');
    component.find('video').simulate('playing');

    expect(component.find('.reactTemplateBrowser-LoadingSpinner-spinner').length).toEqual(0);
  });

  it('removes loading spinner when video is unloaded', () => {
    const template = create('template');
    const component = mount(<Template template={ template } />);
    component.simulate('mouseEnter');
    
    component.find('video').simulate('loadstart');
    component.simulate('mouseLeave');

    expect(component.find('.reactTemplateBrowser-LoadingSpinner-spinner').length).toEqual(0);
  });

});


