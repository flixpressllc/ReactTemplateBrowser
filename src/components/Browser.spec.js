import React from 'react';
import { shallow } from 'enzyme';
import create from '../../specs/spec-helpers';
import Browser from './Browser';

const TEST_TEMPLATES = [
  create('template', {tags: ['one']}),
  create('template', {tags: ['two']})
];

it('renders without crashing', () => {
  shallow(<Browser />);
});

it('creates a tag pane', () => {
  const app = shallow(<Browser templates={ TEST_TEMPLATES } />);
  
  expect(app.find('TagPane').length).toBe(1);
});

it('creates a template pane', ()=>{
  const app = shallow(<Browser templates={ TEST_TEMPLATES } />);
  expect(app.find('TemplatePane').length).toBe(1);
});
