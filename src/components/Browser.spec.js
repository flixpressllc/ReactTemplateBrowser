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
 shallow(<Browser />);
});

it('creates a tag pane', () => {
  const templates = TEST_TEMPLATES;
  const app = shallow(<Browser templates={templates} />);
  
  expect(app.find('TagPane').length).toBe(1);
});

it('displays templates', ()=>{
  const templates = TEST_TEMPLATES;
  const app = shallow(<Browser templates={ templates } />);
  expect(app.find('Template').length).toBe(templates.length);
});
