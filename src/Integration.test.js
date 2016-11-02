import React from 'react';
import { shallow, mount } from 'enzyme';
import Browser from './Browser';

const TEST_TEMPLATES = [
  {
    id: 1,
    tags: ['fast']
  },{
    id: 2,
    tags: ['slow']
  }
];

it('renders without crashing', () => {
 mount(<Browser />);
});

it('creates a tag pane with the right number of nodes', () => {
  const templates = TEST_TEMPLATES;
  const app = mount(<Browser templates={templates} />);
  let nodeLength = app.find('.tag-pane a').length;
  expect(nodeLength).toBe(2);
});

it('displays templates', ()=>{
  const templates = TEST_TEMPLATES;
  const app = mount(<Browser templates={ templates } />);
  expect(app.find('.template').length).toBe(templates.length);
});
