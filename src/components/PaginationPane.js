import React, { Component } from 'react';
import cx from 'classnames';
import './PaginationPane.css';
import { DEFAULT_PAGE_SIZE } from '../stores/app-settings';

class PaginationPane extends Component {
  
  constructor(props){
    super(props);

    this.handleActionButtonClick = this.handleActionButtonClick.bind(this);
    this.renderPageLinks = this.renderPageLinks.bind(this);
  }

  beginningItemForPage (pageNumber) {
    return this.props.pageSize * (pageNumber - 1)
  }

  dataForActionButton (relString) {
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
      default: //no op.
    }

    return this.dataForPageNumber(pageNumber);
  }

  dataForPageNumber (pageNumber) {
    return {
      begin: this.beginningItemForPage(pageNumber),
      end: this.endingItemForPage(pageNumber),
      onPage: pageNumber,
      pages: this.totalPages()
    };
  }

  endingItemForPage (pageNumber) {
    return this.props.pageSize * (pageNumber - 1) + this.props.pageSize - 1
  }

  handleActionButtonClick(e) {
    let buttonRel = e.target.rel;
    let paginationData = this.dataForActionButton(buttonRel);
    this.props.onChange(paginationData);
  }

  handleClickPageLink (pageNumber) {
    let paginationData = this.dataForPageNumber(pageNumber);
    this.props.onChange(paginationData);
  }

  renderPageLinks () {
    const currentPage = this.props.currentPage;
    const totalPages = this.totalPages();
    let pageLinks = [];
    
    for (let i = 1; i <= totalPages; i++) {
      let isActivePage = i === currentPage;
      let handleClick = () => { this.handleClickPageLink(i) };
      
      pageLinks.push(
        <a key={ i }
          className={cx('reactTemplateBrowser-PaginationPane-pageLink', {'active-page': isActivePage})}
          onClick={ handleClick }>
          { i }
        </a>
      );
    }
    
    return pageLinks;
  }
  
  totalPages () {
    return Math.ceil( this.props.numItems / this.props.pageSize );
  }

  render() {
    const pages = this.renderPageLinks();
    const total = this.totalPages();

    const disableFirstPrev = this.props.currentPage === 1;
    const handleFirstPrev = disableFirstPrev ? () => {} : this.handleActionButtonClick;
    const disableLastNext = this.props.currentPage === total;
    const handleLastNext = disableLastNext ? () => {} : this.handleActionButtonClick;

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
        { pages }
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

  static paginate(array, page, pageSize) {
    array = [].concat(array);
    pageSize = pageSize ? pageSize : DEFAULT_PAGE_SIZE;
    return array.splice( (page * pageSize - pageSize), pageSize )
  }

}

PaginationPane.defaultProps = {
  pageSize: DEFAULT_PAGE_SIZE,
  numItems: 0
};

export default PaginationPane;