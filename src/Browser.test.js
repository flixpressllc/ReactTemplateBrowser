import React from 'react';
import { shallow, mount } from 'enzyme';
import Browser from './Browser';

it('renders without crashing', () => {
 mount(<Browser />);
});

