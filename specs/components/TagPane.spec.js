import React from 'react';
import { shallow, mount } from 'enzyme';
import TagPane from '../../src/components/TagPane';

const TAG_SELECTOR = '.reactTemplateBrowser-TagPane-tag';

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

it('reports correctly when a tag is clicked', () => {
  const tags = ['one', 'two', 'three'];
  let choose = jest.fn();
  const pane = mount(<TagPane tags={ tags } chooseTag={ choose } />);
  
  pane.find(TAG_SELECTOR).not('.all-tag').at(0).simulate('click');

  expect(choose.mock.calls[0]).toEqual(['one']);
});

it('identifies the chosen tag', () => {
  const pane = mount(<TagPane tags={['one']} activeTag='one' />);

  expect(pane.find('.active-tag').get(0).hash).toBe('#one');
});

it('creates an "all" category along side the tags', () => {
  const tags = ['one', 'two', 'three']; 
  const pane = mount(<TagPane tags={ tags } chooseTag={ jest.fn() } />);
  
  pane.find('a').first().simulate('click');

  expect(pane.text()).toContain('All Templates');
});