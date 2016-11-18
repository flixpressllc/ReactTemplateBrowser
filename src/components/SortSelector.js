import React, { Component } from 'react';
import Sorter from '../helpers/TemplateSorter';
import './SortSelector.css';

const SORT_OPTIONS = Sorter.getSortList();

class SortSelector extends Component {
  
  constructor (props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  getFilteredSortOptions () {
    const userIsNotFree = this.props.userType !== 'Free';
    return SORT_OPTIONS.filter( (option) => {
      if (userIsNotFree && option.value === 'free-first') return false;
      return true;
    });
  }

  handleChange(e) {
    if (e.target.value !== this.props.value) {
      this.props.onChange(e.target.value);
    }
  }

  renderSortOptions () {
    let sortOptions = this.getFilteredSortOptions();
    return sortOptions.map( (option, i) => {
      return (<option key={i} value={ option.value }>{ option.name }</option>);
    });
  }

  render () {
    const options = this.renderSortOptions();
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
