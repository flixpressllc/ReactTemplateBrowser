import React from 'react';
import { shallow, mount } from 'enzyme';
import TagPane from './TagPane';

it('renders without crashing', () => {
 mount(<TagPane />);
});

it('displays all tags passed in', () => {
  const tags = ['one', 'two', 'three']; 
  const pane = shallow(<TagPane tags={ tags } />);
  tags.forEach( (value) => {
    expect(pane.text()).toContain(value);
  } )
});