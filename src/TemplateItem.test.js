import React from 'react';
import { shallow } from 'enzyme';
import TemplateItem from './TemplateItem';

const VALID_TEMPLATE_ITEM = {
  id: 79,
  tags: ['pro', 'gags'],
  name: 'Sparky Pro Electrocutionator'
}

it('renders without crashing', () => {
 shallow(<TemplateItem item={ VALID_TEMPLATE_ITEM } />);
});
