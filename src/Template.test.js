import React from 'react';
import { shallow } from 'enzyme';
import Template from './Template';

const VALID_TEMPLATE_OBJECT = {
  id: 79,
  tags: ['pro', 'gags'],
  name: 'Sparky Pro Electrocutionator',
  type: 'TextOnly'
}

it('renders without crashing', () => {
 shallow(<Template template={ VALID_TEMPLATE_OBJECT } />);
});

it('renders the template name', () => {
  let templateObject = VALID_TEMPLATE_OBJECT;
  templateObject.name = 'Sparky'
  
  const component = shallow(<Template template={ templateObject } />)
  
  expect(component.text()).toContain('Sparky');
});

it('creates a correctly formatted link', () => {
  let templateObject = VALID_TEMPLATE_OBJECT;
  templateObject.id = '79';
  templateObject.type = 'Slides';
  
  const component = shallow(<Template template={ templateObject } />);

  expect(component.find('a').first().prop('href')).toBe('/templates/Slides.aspx?tid=79');
});