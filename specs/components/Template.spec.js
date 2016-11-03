import React from 'react';
import { shallow } from 'enzyme';
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

