import React, { Component } from 'react';
import cx from 'classnames';
import './NoFlashFilter.css';

class NoFlashFilter extends Component {

  constructor (props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      hide: true
    }
  }

  handleChange(e) {
    this.props.onChange(e.target.value);
    this.setState({ hide: !this.state.hide })
  }

  render(){
    const hide = this.state.hide;
    const visibleOrHidden = hide ? 'hidden' : 'visible';
    const clickActionvalue = hide ? 'show' : 'hide';
    const buttonText = hide ? 'Show' : 'Hide';

    return (
      <div className="reactTemplateBrowser-NoFlashFilter">
        <span>Templates requiring Flash are { visibleOrHidden }. </span>
        <button className="reactTemplateBrowser-NoFlashFilter-button"
          type="button"
          value={ clickActionvalue }
          onClick={ this.handleChange }>
          { buttonText }
        </button>
      </div>
    );
  }
}

export default NoFlashFilter;
