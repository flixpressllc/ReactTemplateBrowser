import React from 'react';
import { shallow, mount } from 'enzyme';
import TemplateGroup from './TemplateGroup';
import create from '../../specs/spec-helpers';

it('renders without crashing', () => {
 shallow(<TemplateGroup templateGroup={ create('templateGroup') } />);
});

it('renders the template name', () => {
  let templateObject = create('templateGroup');
  templateObject.name = 'Sparky'

  const component = shallow(<TemplateGroup templateGroup={ templateObject } />)

  expect(component.text()).toContain('Sparky');
});

it('creates a correctly formatted link', () => {
  let templateObject = create('templateGroup', {id: 79, type: 'Slides'});

  const component = shallow(<TemplateGroup templateGroup={ templateObject } />);

  expect(component.find('a').first().prop('href')).toBe('/templates/Slides.aspx?tid=79');
});

describe('when asked, ', () => {
  it('displays the lowest plan it is in', () => {
    let templateObject = create('templateGroup', {plan: 'Personal', price: '$30'});
    let opts = { costType: 'plan' }

    const component = shallow(<TemplateGroup templateGroup={ templateObject } options={ opts } />);

    expect(component.text()).toContain('Personal');
    expect(component.text()).not.toContain('$30');
  });

  it('displays the price', () => {
    let templateObject = create('templateGroup', {plan: 'Personal', price: '$25'});
    let opts = { costType: 'price' }

    const component = shallow(<TemplateGroup templateGroup={ templateObject } options={ opts } />);

    expect(component.text()).toContain('$25');
    expect(component.text()).not.toContain('Personal');
  });
});

describe('hover interactions', () => {
  describe('with guest', () => {
    it('changes the title to a message', () => {
      const template = create('templateGroup');
      const component = shallow(<TemplateGroup templateGroup={ template } userType={ 'guest' } />);

      component.setProps({isHovered: true});

      expect(component.text()).toContain('Click to view group');
      expect(component.text()).not.toContain('ID:');
    });

  });
  describe('with plan user with editing privileges', () => {
    it('changes the title to a message', () => {
      const template = create('templateGroup', {plan: 'Free'});
      const component = shallow(<TemplateGroup templateGroup={ template } userType={ 'Free' } />);

      component.setProps({isHovered: true});

      expect(component.text()).toContain('Click to view group');
      expect(component.text()).not.toContain('ID:');
    });

  });
  describe('with plan user with trial privileges', () => {
    it('changes the title to a message', () => {
      const template = create('templateGroup', {plan: 'Personal'});
      const component = shallow(<TemplateGroup templateGroup={ template } userType={ 'Free' } />);

      component.setProps({isHovered: true});

      expect(component.text()).toContain('Click to view group');
      expect(component.text()).not.toContain('ID:');
    });

    it('changes the lower bar to call to action', () => {
      const template = create('templateGroup', {plan: 'Personal'});
      const component = shallow(<TemplateGroup templateGroup={ template } userType={ 'Free' } />);

      component.setProps({isHovered: true});

      expect(component.text()).toContain('Upgrade for full access');
    });

    it('the call to action navigates to upgrade page', () => {
      const fakeHandleClick = jest.fn(()=>{});
      const wrongFake = jest.fn(()=>{});
      const template = create('templateGroup', {plan: 'Personal'});
      const component = shallow(<TemplateGroup templateGroup={ template } userType={ 'Free' } />);
      component.instance().navigateToPath = fakeHandleClick;
      component.setProps({isHovered: true, openGroup: wrongFake});

      component.find('.reactTemplateBrowser-TemplateGroup-upgradeLink').first().simulate('mouseOver');
      component.simulate('click', { preventDefault: () => null } );

      expect(wrongFake).not.toHaveBeenCalled();
      expect(fakeHandleClick).toHaveBeenCalledWith('/upgrade');
    });

  });
  describe('with plan user who cannot edit', () => {
    it('changes the title to a message', () => {
      const template = create('templateGroup', {plan: 'Expert'});
      const component = shallow(<TemplateGroup templateGroup={ template } userType={ 'Free' } />);

      component.setProps({isHovered: true});

      expect(component.text()).toContain('Click to view group');
      expect(component.text()).not.toContain('ID:');
    });
    it('changes the lower bar to call to action', () => {
      const template = create('templateGroup', {plan: 'Expert'});
      const component = shallow(<TemplateGroup templateGroup={ template } userType={ 'Free' } />);

      component.setProps({isHovered: true});

      expect(component.text()).toContain('Upgrade for full access');
    });

  });
  describe('with PAYG user', () => {
    it('changes the title to a message', () => {
      const template = create('templateGroup');
      const component = shallow(<TemplateGroup templateGroup={ template } userType={ 'PAYG' } />);

      component.setProps({isHovered: true});

      expect(component.text()).toContain('Click to view group');
      expect(component.text()).not.toContain('ID:');
    });

  });

});

describe('Plan Levels', () => {
  it('can display a trial ribbon', () => {
    const template = create('templateGroup', {plan: 'Expert'});
    const component = mount(<TemplateGroup templateGroup={ template } userType={ 'Personal' }/>);

    expect(component.find('.reactTemplateBrowser-TemplateGroup-trialRibbon').length).toBe(1);
  });
  it('can disable templates beyond trial levels', () => {
    const template = create('templateGroup', {plan: 'Expert'});
    const component = mount(<TemplateGroup templateGroup={ template } userType={ 'Free' }/>);

    expect(component.find('.reactTemplateBrowser-TemplateGroup.disabled-template').length).toBe(1);
  });
});



