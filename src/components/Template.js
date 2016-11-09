import React, { Component } from 'react';
import TemplateFeatures from './TemplateFeatures';
import '../css/Template.css';

class Template extends Component {
  
  constructor (props) {
    super(props)
    this.state = {
      isHovered: false
    }

    this.handleHoverOn = this.handleHoverOn.bind(this)
    this.handleHoverOff = this.handleHoverOff.bind(this)
  }

  createLink () {
    const t = this.props.template;
    return `/templates/${t.type}.aspx?tid=${t.id}`;
  }

  handleHoverOn () {
    this.setState({isHovered: true})
  }

  handleHoverOff () {
    this.setState({isHovered: false})
  }
  
  render (){
    const link = this.createLink();
    const template = this.props.template;
    const cost = this.props.options.costType === 'plan' ? (
      <span className='dispPlan'>Plan: { template.plan }</span>
      ) : (
      <span className='dispPrice'>Pay As You Go: { template.price }</span>
      );
    const imageOrMovie = !this.state.isHovered ? (
      <img src={ template.image } alt={`Screenshot of template ${template.id}`} />
      ) : (
      <video src={'https://mediarobotvideo.s3.amazonaws.com/sm/Template' + template.id + '.mp4'}
        poster={ template.image }
        autoPlay={true}
        loop={true}/>
      );

    const headerText = (this.state.isHovered) ? 'Click to edit' : `ID:${template.id} ${template.name}`;
    return (
      <a className='reactTemplateBrowser-Template template browserItem' href={ link }
        onMouseEnter={ this.handleHoverOn } 
        onMouseLeave={ this.handleHoverOff} >
        <header className='browserInnerItem'>
          { headerText }
        </header>
        <div className='reactTemplateBrowser-Template-previewArea'>
          { imageOrMovie }
          <TemplateFeatures features={ this.props.template.features } hideBadges={ this.state.isHovered }/>
        </div>
        <div className='browserSubTitleDiv'>
          <span className='tempDur'>Duration: { template.duration }</span>
          { cost }
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