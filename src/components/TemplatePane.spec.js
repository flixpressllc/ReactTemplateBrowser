import React from 'react';
import { shallow, mount } from 'enzyme';
import create from '../../specs/spec-helpers';
import TemplatePane from './TemplatePane';

const TEST_TEMPLATES = [
  create('template', {tags: ['two']}),
  create('template', {tags: ['one']})
];

it('renders without crashing', () => {
  shallow(<TemplatePane />);
});

it('displays templates', ()=>{
  const templates = TEST_TEMPLATES;
  const app = shallow(<TemplatePane templates={ templates } />);
  expect(app.find('Template').length).toBe(templates.length);
});

it('displays template groups', ()=>{
  const groups = [create('templateGroup')];
  const app = shallow(<TemplatePane templateGroups={ groups } />);
  expect(app.find('TemplateGroup').length).toBe(1);
});

it('displays templates and groups together', ()=>{
  const templates = TEST_TEMPLATES;
  const groups = [create('templateGroup')];
  const app = shallow(<TemplatePane templates={ templates } templateGroups={ groups } />);
  expect(app.find('Template').length).toBe(templates.length);
  expect(app.find('TemplateGroup').length).toBe(1);
});
