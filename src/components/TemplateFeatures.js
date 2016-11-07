import React, { Component } from 'react';
import { UHD_IMAGE_URL } from '../stores/external-asset-locations';
import '../css/TemplateFeatures.css';

class TemplateFeatures extends Component {
  
  render(){
    let badge = ( this.props.features.has4k ) ? 
      <img src={ UHD_IMAGE_URL } className='reactTemplateBrowser-TemplateFeatures-4kBadge' /> : null ;
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
