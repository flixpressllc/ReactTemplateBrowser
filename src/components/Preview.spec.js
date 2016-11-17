import React from 'react';
import { shallow, mount } from 'enzyme';
import Preview from './Preview';
import create from '../../specs/spec-helpers';

it('renders without crashing', () => {
  shallow(<Preview />);
});

describe('when inactive', () => {
  it('renders an image', () => {
    const component = shallow(<Preview active={ false } templateId={ 1 } />);

    expect(component.find('img').length).toBe(1);
  });
  it('creates the proper src for an image', () => {
    const component = shallow(<Preview active={ false } templateId={ 1 } />);

    expect(component.find('img').first().prop('src')).toEqual('https://flixpress.com/tempImages/1.jpg');
  });
});
describe('when active', () => {
  it('renders a video', () => {
    const component = shallow(<Preview active={ true } templateId={ 1 } />);

    expect(component.find('video').length).toBe(1);
  });
  it('plays a video', () => {
    const fakeStartOrStopVideo = jest.fn(() => {});
    const component = shallow(<Preview active={ true } templateId={ 1 } />);
    component.instance().startOrStopVideo = fakeStartOrStopVideo;

    component.setProps({active: true});

    expect(fakeStartOrStopVideo).toHaveBeenCalledTimes(1);
  });
  it('creates the proper src for a video', () => {
    const component = shallow(<Preview active={ true } templateId={ 11 } />);

    expect(component.find('video').first().prop('src')).toEqual('https://mediarobotvideo.s3.amazonaws.com/sm/Template11.mp4');
  });
  it('creates the proper src for a video with Id less than 10', () => {
    const component = shallow(<Preview active={ true } templateId={ 1 } />);

    expect(component.find('video').first().prop('src')).toEqual('https://mediarobotvideo.s3.amazonaws.com/sm/Template01.mp4');
  });

  it('displays loading feedback before video plays', () => {
    const component = mount(<Preview active={ true } templateId={ 1 } />);

    component.find('video').simulate('loadstart');
  
    expect(component.find('.reactTemplateBrowser-LoadingSpinner-spinner').length).toEqual(1);
  });

  it('removes loading spinner when video plays', () => {
    const component = mount(<Preview active={ true } templateId={ 1 } />);
    
    component.find('video').simulate('loadstart');
    component.find('video').simulate('playing');
    
    expect(component.find('.reactTemplateBrowser-LoadingSpinner-spinner').length).toEqual(0);
  });

  it('removes loading spinner when video is unloaded', () => {
    const component = mount(<Preview active={ true } templateId={ 1 } />);
    
    component.find('video').simulate('loadstart');
    component.setProps({active: false, templateId: 1});

    expect(component.find('.reactTemplateBrowser-LoadingSpinner-spinner').length).toEqual(0);
  });

});

