import React from 'react';
import { shallow } from 'enzyme';
import create from '../../specs/spec-helpers';
import Browser from './Browser';

const TEST_TEMPLATES = [
  create('template', {tags: ['one']}),
  create('template', {tags: ['two']})
];

it('renders without crashing', () => {
  shallow(<Browser />);
});

it('creates a tag pane', () => {
  const app = shallow(<Browser templates={ TEST_TEMPLATES } />);
  expect(app.find('TagPane').length).toBe(1);
});

it('creates a template pane', ()=>{
  const app = shallow(<Browser templates={ TEST_TEMPLATES } />);
  expect(app.find('TemplatePane').length).toBe(1);
});

describe('cost type', () => {
  describe('when user is a guest', () => {
    it('defaults to "plan"', () => {
      const app = shallow(<Browser templates={ TEST_TEMPLATES } userType="guest" />);
      expect(app.state('templateOptions').costType).toEqual('plan');
    });
    it('can be overwritten with "preferredCostType"', () => {
      const app = shallow(<Browser
        templates={ TEST_TEMPLATES }
        preferredCostType="price"
        userType="guest" />);
      expect(app.state('templateOptions').costType).toEqual('price');
    });
    it('defaults to plan when "preferredCostType" is not valid', () => {
      const app = shallow(<Browser
        templates={ TEST_TEMPLATES }
        preferredCostType="xprice"
        userType="guest" />);
      expect(app.state('templateOptions').costType).toEqual('plan');
    });
  });
  describe('when user is on a plan', () => {
    it('defaults to "plan"', () => {
      const app = shallow(<Browser templates={ TEST_TEMPLATES } userType="Free" />);
      expect(app.state('templateOptions').costType).toEqual('plan');
    });
    it('ignores "preferredCostType"', () => {
      const app = shallow(<Browser
        templates={ TEST_TEMPLATES }
        preferredCostType="price"
        userType="Free" />);
      expect(app.state('templateOptions').costType).toEqual('plan');
    });
  });
  describe('when user is PAYG', () => {
    it('defaults to "price"', () => {
      const app = shallow(<Browser templates={ TEST_TEMPLATES } userType="Reseller" />);
      expect(app.state('templateOptions').costType).toEqual('price');
    });
    it('ignores "preferredCostType"', () => {
      const app = shallow(<Browser
        templates={ TEST_TEMPLATES }
        preferredCostType="plan"
        userType="Reseller" />);
      expect(app.state('templateOptions').costType).toEqual('price');
    });
  });
});
