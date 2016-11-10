import React, { Component } from 'react';
import { UHD_IMAGE_URL } from '../stores/external-asset-locations';
import './TemplateFeatures.css';

class TemplateFeatures extends Component {
  
  constructor (props) {
    super(props);

    this.canDisplayBadges = this.canDisplayBadges.bind(this);
  }

  canDisplayBadges () {
    const shouldHideBadges = this.props.hideBadges === true;
    const canShowBadges = !shouldHideBadges;
    return canShowBadges;
  }

  render(){
    let badge = ( this.canDisplayBadges() && this.props.features.has4k ) ? 
      <img src={ UHD_IMAGE_URL } className='reactTemplateBrowser-TemplateFeatures-4kBadge' alt='badge indicating this template supports 4K resolution' /> : null ;
    return (
      <div className='reactTemplateBrowser-TemplateFeatures'>
        { badge }
        { this.props.children }
      </div>
    );
  }
}

TemplateFeatures.defaultProps = {
  features: {}
};

export default TemplateFeatures;
