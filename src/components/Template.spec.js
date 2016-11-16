import React from 'react';
import { shallow, mount } from 'enzyme';
import Template from './Template';
import create from '../../specs/spec-helpers';

it('renders without crashing', () => {
 shallow(<Template template={ create('template') } />);
});

it('renders the template name', () => {
  let templateObject = create('template');
  templateObject.name = 'Sparky'
  
  const component = shallow(<Template template={ templateObject } />)
  
  expect(component.text()).toContain('Sparky');
});

it('creates a correctly formatted link', () => {
  let templateObject = create('template', {id: 79, type: 'Slides'});
  
  const component = shallow(<Template template={ templateObject } />);

  expect(component.find('a').first().prop('href')).toBe('/templates/Slides.aspx?tid=79');
});

it('displays the duration', () => {
  let templateObject = create('template', {duration: '1:00'});
  
  const component = shallow(<Template template={ templateObject } />);

  expect(component.text()).toContain('1:00');
});

describe('when asked, ', () => {
  it('displays the lowest plan it is in', () => {
    let templateObject = create('template', {plan: 'Personal', price: '$30'});
    let opts = { costType: 'plan' }
    
    const component = shallow(<Template template={ templateObject } options={ opts } />);

    expect(component.text()).toContain('Personal');
    expect(component.text()).not.toContain('$30');
  });

  it('displays the price', () => {
    let templateObject = create('template', {plan: 'Personal', price: '$25'});
    let opts = { costType: 'price' }
    
    const component = shallow(<Template template={ templateObject } options={ opts } />);

    expect(component.text()).toContain('$25');
    expect(component.text()).not.toContain('Personal');
  });
});

describe('hover interactions', () => {
  // Because of using HoverIntent, interactions/expectations after `mouseover`
  // must be wrapped in `setTimeout` to work properly.
  
  it('changes the title to a message on hover', () => {
    const template = create('template');
    const component = shallow(<Template template={ template } />);

    component.simulate('mouseover');
    setTimeout( () => {

      expect(component.text()).toContain('Click to');
      expect(component.text()).not.toContain('ID:');
    },0);
  });

  it('changes the image to a video on hover', () => {
    const template = create('template');
    const component = shallow(<Template template={ template } />);

    component.simulate('mouseover');
    
    setTimeout( () => {
      expect(component.find('video').length).toEqual(1);
    },0);
  });

  describe('Plan Levels', () => {
    it('can display a trial ribbon', () => {
      const template = create('template', {plan: 'Expert'});
      const component = mount(<Template template={ template } userPlanLevel={ 'Personal' }/>);

      expect(component.find('.reactTemplateBrowser-Template-trialRibbon').length).toBe(1);
    });
    it('can disable templates beyond trial levels', () => {
      const template = create('template', {plan: 'Expert'});
      const component = mount(<Template template={ template } userPlanLevel={ 'Free' }/>);

      expect(component.find('.reactTemplateBrowser-Template.disabled-template').length).toBe(1);
    });
  });

});


