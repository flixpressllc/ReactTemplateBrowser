import React, { Component } from 'react';
import { clone } from '../helpers/ObjectHelpers'
import '../css/PaginationPane.css';

const DEFAULT_PAGE_SIZE = 12;

class PaginationPane extends Component {
  
  constructor(props){
    super(props);

    this.handlePageChange = this.handlePageChange.bind(this);
  }

  beginningItemForPage (pageNumber) {
    return this.props.pageSize * (pageNumber - 1)
  }

  endingItemForPage (pageNumber) {
    return this.props.pageSize * (pageNumber - 1) + this.props.pageSize - 1
  }

  totalPages () {
    return Math.ceil( this.props.numItems / this.props.pageSize );
  }

  static paginate(array, page, pageSize) {
    array = [].concat(array);
    pageSize = pageSize ? pageSize : DEFAULT_PAGE_SIZE;
    return array.splice( (page * pageSize - pageSize), pageSize )
  }

  dataFor (relString) {
    let pageNumber;
    switch (relString) {
      case 'next':
        pageNumber = this.props.currentPage + 1;
        break;
      case 'prev':
        pageNumber = this.props.currentPage - 1;
        break;
      case 'last':
        pageNumber = this.totalPages();
        break;
      case 'first':
        pageNumber = 1;
        break;
    }

    return {
      begin: this.beginningItemForPage(pageNumber),
      end: this.endingItemForPage(pageNumber),
      onPage: pageNumber,
      pages: this.totalPages()
    };
  }

  handlePageChange(e) {
    let buttonRel = e.target.rel;
    let currentPaginationData = this.props;
    let paginationData = this.dataFor(buttonRel);
    this.props.onChange(paginationData);
  }
  
  render() {
    const page = this.props.currentPage;
    const total = this.totalPages();

    const disableFirstPrev = this.props.currentPage === 1;
    const handleFirstPrev = disableFirstPrev ? () => {} : this.handlePageChange;
    const disableLastNext = this.props.currentPage === total;
    const handleLastNext = disableLastNext ? () => {} : this.handlePageChange;

    return (
      <div className='reactTemplateBrowser-PaginationPane'>
        <a rel='first'
          className='reactTemplateBrowser-PaginationPane-nav'
          disabled={ disableFirstPrev }
          onClick={ handleFirstPrev }>First</a>
        <a rel='prev'
          className='reactTemplateBrowser-PaginationPane-nav'
          disabled={ disableFirstPrev }
          onClick={ handleFirstPrev }>Previous</a>
        Page { page } of { total }
        <a rel='next'
          className='reactTemplateBrowser-PaginationPane-nav'
          disabled={ disableLastNext }
          onClick={ handleLastNext }>Next</a>
        <a rel='last'
          className='reactTemplateBrowser-PaginationPane-nav'
          disabled={ disableLastNext }
          onClick={ handleLastNext }>Last</a>
      </div>
    )
  }
}

PaginationPane.defaultProps = {
  pageSize: DEFAULT_PAGE_SIZE,
  numItems: 0
};

export default PaginationPane;