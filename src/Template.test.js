import React from 'react';
import { shallow } from 'enzyme';
import Template from './Template';

function createTemplate() {
  const VALID_TEMPLATE_OBJECT = {
    id: 79,
    tags: ['pro', 'gags'],
    name: 'Sparky Pro Electrocutionator',
    type: 'TextOnly',
    image: 'some/image.jpg',
    duration: '0:23',
    plan: 'Expert',
    price: '$5'
  };

  return VALID_TEMPLATE_OBJECT;
}

it('renders without crashing', () => {
 shallow(<Template template={ createTemplate() } />);
});

it('renders the template name', () => {
  let templateObject = createTemplate();
  templateObject.name = 'Sparky'
  
  const component = shallow(<Template template={ templateObject } />)
  
  expect(component.text()).toContain('Sparky');
});

it('creates a correctly formatted link', () => {
  let templateObject = createTemplate();
  templateObject.id = '79';
  templateObject.type = 'Slides';
  
  const component = shallow(<Template template={ templateObject } />);

  expect(component.find('a').first().prop('href')).toBe('/templates/Slides.aspx?tid=79');
});

it('displays an image thumbnail', () => {
  let templateObject = createTemplate();
  templateObject.image = 'an/image.jpg'
  
  const component = shallow(<Template template={ templateObject } />);

  expect(component.find('img').first().prop('src')).toBe('an/image.jpg');
});

it('displays the duration', () => {
  let templateObject = createTemplate();
  templateObject.duration = '1:00';
  
  const component = shallow(<Template template={ templateObject } />);

  expect(component.text()).toContain('1:00');
});

describe('when asked, ', () => {
  it('displays the lowest plan it is in', () => {
    let templateObject = createTemplate();
    templateObject.plan = 'Personal';
    templateObject.price = '$30';
    let opts = {
      costType: 'plan'
    }
    
    const component = shallow(<Template template={ templateObject } options={ opts } />);

    expect(component.text()).toContain('Personal');
    expect(component.text()).not.toContain('$30');
  });

  it('displays the price', () => {
    let templateObject = createTemplate();
    templateObject.price = '$25';
    templateObject.plan = 'Personal';
    let opts = {
      costType: 'price'
    }
    
    const component = shallow(<Template template={ templateObject } options={ opts } />);

    expect(component.text()).toContain('$25');
    expect(component.text()).not.toContain('Personal');
  });
});

