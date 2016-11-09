import React, { Component } from 'react';
import Sorter from '../helpers/TemplateSorter';
import './SortSelector.css';

const SORT_OPTIONS = Sorter.getSortList();

class SortSelector extends Component {
  
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
    const options = SORT_OPTIONS.map( (option, i) => {
      return (<option key={i} value={ option.value }>{ option.name }</option>);
    });
    return (
      <div className='reactTemplateBrowser-SortSelector'>
        <span>Sort by: </span>
        <select onChange={ this.handleChange } value={ this.props.value } >
          { options }
        </select>
      </div>
    );
  }
}

export default SortSelector;
