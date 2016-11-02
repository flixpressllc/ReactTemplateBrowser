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
  let nodeLength = app.find('TagPane a').length;
  
  expect(nodeLength).toBe(2);
});

it('changes displayed templates on tag click', () => {
  const templates = TEST_TEMPLATES;
  const app = mount(<Browser templates={ templates } />);
  const firstTag = app.find('TagPane a').first();

  firstTag.simulate('click');

  expect(app.find('Template').length).toBe(1);
});
