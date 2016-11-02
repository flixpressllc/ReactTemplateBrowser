import React from 'react';
import { shallow } from 'enzyme';
import TemplateItem from './TemplateItem';

const VALID_TEMPLATE_ITEM = {
  id: 79,
  tags: ['pro', 'gags'],
  name: 'Sparky Pro Electrocutionator',
  type: 'TextOnly'
}

it('renders without crashing', () => {
 shallow(<TemplateItem item={ VALID_TEMPLATE_ITEM } />);
});

it('renders the template name', () => {
  let templateObject = VALID_TEMPLATE_ITEM;
  templateObject.name = 'Sparky'
  
  const component = shallow(<TemplateItem item={ templateObject } />)
  
  expect(component.text()).toContain('Sparky');
});

it('creates a correctly formatted link', () => {
  let templateObject = VALID_TEMPLATE_ITEM;
  templateObject.id = '79';
  templateObject.type = 'Slides';
  
  const component = shallow(<TemplateItem item={ templateObject } />);

  expect(component.find('a').first().prop('href')).toBe('/templates/Slides.aspx?tid=79');
});