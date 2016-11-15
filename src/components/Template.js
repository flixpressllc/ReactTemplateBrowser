import React, { Component } from 'react';
import TemplateFeatures from './TemplateFeatures';
import LoadingSpinner from './LoadingSpinner';
import hoverIntent from 'hoverintent';
import { padLeft } from '../helpers/StringHelpers';
import { openTemplateEditorUrl } from '../helpers/ExternalServices';
import './Template.css';

class Template extends Component {
  
  constructor (props) {
    super(props)
    this.state = {
      isHovered: false,
      videoIsLoading: false
    }

    this.handleHoverOn = this.handleHoverOn.bind(this);
    this.handleHoverOff = this.handleHoverOff.bind(this);
    this.handleVideoLoadStart = this.handleVideoLoadStart.bind(this);
    this.handleVideoLoadEnd = this.handleVideoLoadEnd.bind(this);
    this.handleClickOnTemplate = this.handleClickOnTemplate.bind(this);
  }

  componentDidMount () {
    this.hoverIntentListener = hoverIntent(this.mountedInstance, () => {
      this.handleHoverOn();
    }, () => {
      this.handleHoverOff();
    });
  }

  componentWillUnmount () {
    this.hoverIntentListener.remove();
  }

  createLink () {
    const t = this.props.template;
    return `/templates/${t.type}.aspx?tid=${t.id}`;
  }

  getVideoId (id) {
    return padLeft(id, '0', 2);
  }

  handleClickOnTemplate (e) {
    e.preventDefault();
    openTemplateEditorUrl( this.createLink() );
  }

  handleHoverOn () {
    this.setState({isHovered: true})
  }

  handleHoverOff () {
    this.setState({
      isHovered: false,
      videoIsLoading: false
    })
  }
  
  handleVideoLoadStart () {
    this.setState({videoIsLoading: true})
  }

  handleVideoLoadEnd () {
    this.setState({videoIsLoading: false})
  }

  render (){
    const link = this.createLink();
    const template = this.props.template;
    const videoId = this.getVideoId(template.id);
    const cost = this.props.options.costType === 'plan' ?
      `Plan: ${ template.plan }` : `Pay As You Go: ${ template.price }`;

    const imageOrMovie = !this.state.isHovered ? (
      <img src={ template.image } alt={`Screenshot of template ${template.id}`} />
      ) : (
      <video src={'https://mediarobotvideo.s3.amazonaws.com/sm/Template' + videoId + '.mp4'}
        poster={ template.image }
        onLoadStart={ this.handleVideoLoadStart }
        onPlaying={ this.handleVideoLoadEnd }
        autoPlay={true}
        loop={true}/>
      );

    const headerText = (this.state.isHovered) ? 'Click to edit' : `ID:${template.id} ${template.name}`;

    return (
      <a className='reactTemplateBrowser-Template template browserItem'
        href={ link }
        ref={ (el) => this.mountedInstance = el } 
        onClick={ this.handleClickOnTemplate }
        >
        <header className='browserInnerItem'>
          { headerText }
        </header>
        <div className='reactTemplateBrowser-Template-previewArea'>
          { imageOrMovie }
          <TemplateFeatures features={ this.props.template.features } hideBadges={ this.state.isHovered }/>
          <LoadingSpinner active={ this.state.videoIsLoading } />
        </div>
        <div className='browserSubTitleDiv'>
          <span className='reactTemplateBrowser-Template-duration'>Duration: { template.duration }</span>
          <span className='reactTemplateBrowser-Template-priceOrPlan'>{ cost }</span>
        </div>
      </a>
    );
  }
}

Template.defaultProps = {
  options: {
    costType: 'plan'
  }
};

export default Template;