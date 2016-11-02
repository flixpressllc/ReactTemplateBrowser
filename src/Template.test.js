import React from 'react';
import { shallow } from 'enzyme';
import Template from './Template';

function createTemplate() {
  const VALID_TEMPLATE_OBJECT = {
    id: 79,
    tags: ['pro', 'gags'],
    name: 'Sparky Pro Electrocutionator',
    type: 'TextOnly',
    image: 'some/image.jpg',
    duration: '0:23',
    plan: 'Expert',
    price: '$5'
  };

  return VALID_TEMPLATE_OBJECT;
}

it('renders without crashing', () => {
 shallow(<Template template={ createTemplate() } />);
});

it('renders the template name', () => {
  let templateObject = createTemplate();
  templateObject.name = 'Sparky'
  
  const component = shallow(<Template template={ templateObject } />)
  
  expect(component.text()).toContain('Sparky');
});

it('creates a correctly formatted link', () => {
  let templateObject = createTemplate();
  templateObject.id = '79';
  templateObject.type = 'Slides';
  
  const component = shallow(<Template template={ templateObject } />);

  expect(component.find('a').first().prop('href')).toBe('/templates/Slides.aspx?tid=79');
});

it('displays an image thumbnail', () => {
  let templateObject = createTemplate();
  templateObject.image = 'an/image.jpg'
  
  const component = shallow(<Template template={ templateObject } />);

  expect(component.find('img').first().prop('src')).toBe('an/image.jpg');
});