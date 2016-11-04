import React, { Component } from 'react';
import cx from 'classnames';
import PLAN_NAMES from '../stores/plans';

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
    const originalPlanNames = PLAN_NAMES;
    const planNames = originalPlanNames.concat(['All Plans']);
    const options = planNames.map( (name, i) => {
      return (<option key={i} value={ name }>{ name }</option>);
    });
    return (
      <select onChange={ this.handleChange } value={ this.props.value } >
        { options }
      </select>
    );
  }
}

export default PlanFilter;
