import React from 'react';
import { shallow, mount } from 'enzyme';
import TagPane from './TagPane';

it('renders without crashing', () => {
 shallow(<TagPane />);
});

it('displays all tags passed in', () => {
  const tags = ['one', 'two', 'three']; 
  const pane = shallow(<TagPane tags={ tags } />);
  tags.forEach( (value) => {
    expect(pane.text()).toContain(value);
  } )
});

it('sets its state correctly when a tag is clicked', () => {
  const tags = ['one', 'two', 'three']; 
  const pane = mount(<TagPane tags={ tags } chooseTag={ jest.fn() } />);
  
  pane.find('.tag').at(0).simulate('click');

  expect(pane.state('chosenTag')).toBe('one');
});

it('creates an "all" category along side the tags', () => {
  const tags = ['one', 'two', 'three']; 
  const pane = mount(<TagPane tags={ tags } chooseTag={ jest.fn() } />);
  
  pane.find('a').first().simulate('click');

  expect(pane.state('chosenTag')).toBe('all');
});