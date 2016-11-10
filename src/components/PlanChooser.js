import React, { Component } from 'react';
import { PLAN_NAMES_IN_ORDER } from '../stores/app-settings';
import './PlanChooser.css'

class PlanFilter extends Component {
  
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
    const originalPlanNames = PLAN_NAMES_IN_ORDER;
    const planNames = originalPlanNames.concat(['All Plans']);
    const options = planNames.map( (name, i) => {
      return (<option key={i} value={ name }>{ name }</option>);
    });
    return (
      <div className='reactTemplateBrowser-PlanChooser'>
        <span>Show for plan </span>
        <select onChange={ this.handleChange } value={ this.props.value } >
          { options }
        </select>
      </div>
    );
  }
}

export default PlanFilter;
