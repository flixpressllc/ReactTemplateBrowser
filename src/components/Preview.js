import React, { Component } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { padLeft } from '../helpers/StringHelpers';
import './Preview.css';

class Preview extends Component {
  
  constructor (props) {
    super(props);
    this.state = {
      videoIsLoading: this.props.active
    };

    if (props.templateId) {
      let videoId = padLeft(this.props.templateId.toString(), '0', 2);
      this.videoSrc = `https://mediarobotvideo.s3.amazonaws.com/sm/Template${ videoId }.mp4`
      this.imageSrc = `https://flixpress.com/tempImages/${ props.templateId }.jpg`;
    }

    this.handleVideoLoadEnd = this.handleVideoLoadEnd.bind(this);
    this.handleVideoLoadStart = this.handleVideoLoadStart.bind(this);
  } 

  shouldShowSpinner () {
    return this.props.active && this.state.videoIsLoading;
  }

  handleVideoLoadEnd () {
    this.setState({videoIsLoading: false});
  }

  handleVideoLoadStart () {
    this.setState({videoIsLoading: true});
  }

  renderVideo () {
    return <video 
      className='reactTemplateBrowser-Preview-video'
      src={ this.videoSrc }
      poster={ this.imageSrc }
      onLoadStart={ this.handleVideoLoadStart }
      onPlaying={ this.handleVideoLoadEnd }
      autoPlay={ true }
      loop={ true } />;
  }

  renderImage () {
    return <img
      className='reactTemplateBrowser-Preview-image'
      alt={ `Screenshot of template ${ this.props.templateId }` }
      src={ this.imageSrc } />;
  }
  
  render () {
    if (!this.props.templateId) return null;

    const previewElement = (this.props.active) ? this.renderVideo() : this.renderImage() ;
    const showSpinner = this.shouldShowSpinner();

    return (
      <div className='reactTemplateBrowser-Preview'>
        { previewElement }
        <LoadingSpinner active={ showSpinner } />
      </div>
    )
  }
}

export default Preview;