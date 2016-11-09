import React, { Component } from 'react';
import cx from 'classnames';
import './CostSwitch.css';

class CostSwitch extends Component {
  
  constructor (props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    if (e.target.value !== this.props.value) {
      this.props.onChange(e.target.value);
    }
  }

  render(){
    const costType = this.props.value;
    return (
      <div className='reactTemplateBrowser-CostSwitch'>
        <span>Pricing shown as </span>
        <div className='reactTemplateBrowser-CostSwitch-pricingSwitcher'>
          <label className={cx('option-switcher-switch', {active: costType === 'plan'})}>
            <input
              type='radio'
              value='plan'
              onChange={ this.handleChange }
              checked={ costType === 'plan' } />
            Plans
          </label>
          <label className={cx('option-switcher-switch', {active: costType === 'price'})}>
            <input
              type='radio'
              value='price'
              onChange={ this.handleChange }
              checked={ costType === 'price' } />
            Prices
          </label>
        </div>
        </div>
    );
  }
}

CostSwitch.defaultProps = {
  options: {
    costType: 'plan'
  }
};

export default CostSwitch;
