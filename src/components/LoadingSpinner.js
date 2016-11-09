import React, { Component } from 'react';
import cx from 'classnames';
import './LoadingSpinner.css';

class LoadingSpinner extends Component {
  
  render(){
    let spinner;
    if (!!this.props.active) {
      spinner = <img className='reactTemplateBrowser-LoadingSpinner-spinner' src='https://flixpress.com/images/ajax-loader.gif'/>
    } else {
      spinner = null;
    }
    
    return (
      <div className='reactTemplateBrowser-LoadingSpinner'>
        { spinner }
      </div>
    );
  }
}

LoadingSpinner.defaultProps = {
  active: true
}

export default LoadingSpinner;
