import React, { Component } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { padLeft } from '../helpers/StringHelpers';
import './Preview.css';

class Preview extends Component {

  constructor (props) {
    super(props);
    this.state = {
      videoIsLoading: true
    };

    if (props.templateId) {
      let videoId = padLeft(this.props.templateId.toString(), '0', 2);
      this.videoSrc = `https://mediarobotvideo.s3.amazonaws.com/sm/Template${ videoId }.mp4`
      this.imageSrc = `https://flixpress.com/tempImages/${ props.templateId }.jpg`;
      this.videoElement = null;
    }

    this.handleVideoLoadEnd = this.handleVideoLoadEnd.bind(this);
    this.handleVideoLoadStart = this.handleVideoLoadStart.bind(this);
    this.videoMounted = this.videoMounted.bind(this);
  }

  handleVideoLoadEnd () {
    this.setState({videoIsLoading: false});
  }

  handleVideoLoadStart () {
    this.setState({videoIsLoading: true});
  }

  videoMounted (el) {
    this.videoElement = el;
  }

  startOrStopVideo () {
    if (this.videoElement) {
      if (this.props.active) {
        this.videoElement.play();
      } else {
        this.videoElement.pause();
      }
    }
  }

  render () {
    if (!this.props.templateId) return null;

    const styles = {
      video: (this.props.active && !this.state.videoIsLoading) ? {} : {display: 'none'} ,
    };

    this.startOrStopVideo();

    return (
      <div className='reactTemplateBrowser-Preview'>
        <img className='reactTemplateBrowser-Preview-image'
          alt={ `Screenshot of template ${ this.props.templateId }` }
          src={ this.imageSrc } />
        <LoadingSpinner active={ this.props.active && this.state.videoIsLoading } />
        <video className='reactTemplateBrowser-Preview-video'
          style={ styles.video }
          src={ this.videoSrc }
          preload="none"
          onLoadStart={ this.handleVideoLoadStart }
          onPlaying={ this.handleVideoLoadEnd }
          ref={ (el) => { this.videoMounted(el) } }
          loop={ true } />
      </div>
    )
  }
}

export default Preview;