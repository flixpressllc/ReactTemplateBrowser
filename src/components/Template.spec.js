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
  describe('with guest', () => {
    it('changes the title to a message', () => {
      const template = create('template');
      const component = shallow(<Template template={ template } userType={ 'guest' } />);

      component.setProps({isHovered: true});

      expect(component.text()).toContain('Login to edit');
      expect(component.text()).not.toContain('ID:');
    });

  });
  describe('with plan user with editing privileges', () => {
    it('changes the title to a message', () => {
      const template = create('template', {plan: 'Free'});
      const component = shallow(<Template template={ template } userType={ 'Free' } />);

      component.setProps({isHovered: true});

      expect(component.text()).toContain('Click to edit');
      expect(component.text()).not.toContain('ID:');
    });

  });
  describe('with plan user with trial privileges', () => {
    it('changes the title to a message', () => {
      const template = create('template', {plan: 'Personal'});
      const component = shallow(<Template template={ template } userType={ 'Free' } />);

      component.setProps({isHovered: true});

      expect(component.text()).toContain('Click to try');
      expect(component.text()).not.toContain('ID:');
    });

    it('changes the lower bar to call to action', () => {
      const template = create('template', {plan: 'Personal'});
      const component = shallow(<Template template={ template } userType={ 'Free' } />);

      component.setProps({isHovered: true});

      expect(component.text()).toContain('or Upgrade for full access');
    });

    it('the call to action navigates to upgrade page', () => {
      const fakeHandleClick = jest.fn(()=>{});
      const wrongFake = jest.fn(()=>{});
      const template = create('template', {plan: 'Personal'});
      const component = shallow(<Template template={ template } userType={ 'Free' } />);
      component.instance().navigateToPath = fakeHandleClick;
      component.setProps({isHovered: true, openTemplate: wrongFake});

      component.find('.reactTemplateBrowser-Template-upgradeLink').first().simulate('mouseOver');
      component.simulate('click', { preventDefault: () => null } );

      expect(wrongFake).not.toHaveBeenCalled();
      expect(fakeHandleClick).toHaveBeenCalledWith('/upgrade');
    });

  });
  describe('with plan user who cannot edit', () => {
    it('changes the title to a message', () => {
      const template = create('template', {plan: 'Expert'});
      const component = shallow(<Template template={ template } userType={ 'Free' } />);

      component.setProps({isHovered: true});

      expect(component.text()).toContain('Click to preview only');
      expect(component.text()).not.toContain('ID:');
    });

  });
  describe('with PAYG user', () => {
    it('changes the title to a message', () => {
      const template = create('template');
      const component = shallow(<Template template={ template } userType={ 'PAYG' } />);

      component.setProps({isHovered: true});

      expect(component.text()).toContain('Click to edit');
      expect(component.text()).not.toContain('ID:');
    });

  });

});

describe('Plan Levels', () => {
  it('can display a trial ribbon', () => {
    const template = create('template', {plan: 'Expert'});
    const component = mount(<Template template={ template } userType={ 'Personal' }/>);

    expect(component.find('.reactTemplateBrowser-Template-trialRibbon').length).toBe(1);
  });
  it('can disable templates beyond trial levels', () => {
    const template = create('template', {plan: 'Expert'});
    const component = mount(<Template template={ template } userType={ 'Free' }/>);

    expect(component.find('.reactTemplateBrowser-Template.disabled-template').length).toBe(1);
  });
});



