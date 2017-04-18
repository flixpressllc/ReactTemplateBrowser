import React, { Component } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { padLeft } from '../helpers/StringHelpers';
import './Preview.css';

class Preview extends Component {

  constructor (props) {
    super(props);
    this.state = {
      videoIsLoading: false
    };

    if (props.templateId) {
      let videoId = padLeft(this.props.templateId.toString(), '0', 2);
      this.videoSrc = `https://mediarobotvideo.s3.amazonaws.com/sm/Template${ videoId }.mp4`
      this.imageSrc = `https://flixpress.com/tempImages/${ props.templateId }.jpg`;
      this.videoElement = null;
    }

    this.handleVideoLoadEnd = this.handleVideoLoadEnd.bind(this);
    this.handleVideoLoadStart = this.handleVideoLoadStart.bind(this);
    this.handleVideoOnPlaying = this.handleVideoOnPlaying.bind(this);
    this.handleVideoOnPause = this.handleVideoOnPause.bind(this);
    this.videoMounted = this.videoMounted.bind(this);

    this.videoReportsItselfAs = 'paused';
  }

  handleVideoLoadEnd () {
    if (this.state.videoIsLoading === false) return;
    this.setState({videoIsLoading: false});
  }

  handleVideoLoadStart () {
    if (this.state.videoIsLoading === true) return;
    this.setState({videoIsLoading: true});
  }

  handleVideoOnPlaying () {
    this.videoReportsItselfAs = 'playing';
    this.handleVideoLoadEnd();
  }

  handleVideoOnPause () {
    this.videoReportsItselfAs = 'paused';
  }

  videoMounted (el) {
    if (el === null) return;
    this.videoElement = el;
  }

  playVideo() {
    if (this.videoElement.paused && this.videoReportsItselfAs === 'paused') {
      this.videoElement.play();
    }
  }

  pauseVideo() {
    if (!this.videoElement.paused && this.videoReportsItselfAs === 'playing'){
      this.videoElement.pause();
    }
  }

  startOrStopVideo () {
    if (this.videoElement) {
      if (this.props.active) {
        this.playVideo();
      } else {
        this.pauseVideo();
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
          onPlaying={ this.handleVideoOnPlaying }
          onLoadStart={ this.handleVideoLoadStart }
          onPause={ this.handleVideoOnPause }
          style={ styles.video }
          src={ this.videoSrc }
          preload="none"
          ref={ (el) => { this.videoMounted(el) } }
          loop={ true } />
      </div>
    )
  }
}

export default Preview;