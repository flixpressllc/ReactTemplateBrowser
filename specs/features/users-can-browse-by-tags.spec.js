import React from 'react';
import { mount } from 'enzyme';
import Browser from '../../src/components/Browser';
import create from '../spec-helpers/FaketoryGirl';

const TAG_SELECTOR = '.reactTemplateBrowser-TagPane-tag';

describe('Feature: Users can browse by tag', () => {
  it('creates a tag pane with the right number of nodes', () => {
    const templates = [ 
      create('template', {tags: ['one', 'two']}),
      create('template', {tags: ['one', 'two', 'three']})
    ];
    const numExpectedNodesIncludingAllTagsNode = 4;
    const app = mount(<Browser templates={templates} />);
    let nodeLength = app.find(TAG_SELECTOR).length;
    
    expect(nodeLength).toBe(numExpectedNodesIncludingAllTagsNode);
  });

  it('changes displayed templates on tag click', () => {
    const templates = [ 
      create('template', {tags: ['green']}),
      create('template', {tags: ['red']})
    ];
    const app = mount(<Browser templates={ templates } />);
    const firstTag = app.find(TAG_SELECTOR).at(1);

    firstTag.simulate('click');

    expect(app.find('Template').length).toBe(1);
  });

  it('displays all templates on "all" tag click', () => {
    const templates = [ 
      create('template', {tags: ['green']}),
      create('template', {tags: ['red']})
    ];
    const app = mount(<Browser templates={ templates } />);
    const firstTag = app.find(TAG_SELECTOR + '.all-tag').first();

    firstTag.simulate('click');

    expect(app.find('Template').length).toBe(2);
  });
});
