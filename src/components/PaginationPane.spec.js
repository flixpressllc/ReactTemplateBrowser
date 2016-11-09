import React from 'react';
import { shallow, mount } from 'enzyme';
import PaginationPane from './PaginationPane';

it('renders without crashing', () => {
  shallow(<PaginationPane />);
});

it('reports correctly when "next" is clicked', () => {
  let paginate = jest.fn();
  const pane = mount(<PaginationPane numItems={ 30 } onChange={ paginate } pageSize={ 12 } currentPage={ 1 } />);
  
  pane.find('[rel="next"]').at(0).simulate('click');

  expect(paginate.mock.calls[0]).toEqual([{pages: 3, onPage: 2, begin: 12, end: 23}]);
});

it('reports correctly when "prev" is clicked', () => {
  let paginate = jest.fn();
  const pane = mount(<PaginationPane numItems={ 30 } onChange={ paginate } pageSize={ 12 } currentPage={ 2 } />);
  
  pane.find('[rel="prev"]').at(0).simulate('click');

  expect(paginate.mock.calls[0]).toEqual([{pages: 3, onPage: 1, begin: 0, end: 11}]);
});

it('reports correctly when "last" is clicked', () => {
  let paginate = jest.fn();
  const pane = mount(<PaginationPane numItems={ 30 } onChange={ paginate } pageSize={ 12 } currentPage={ 2 } />);
  
  pane.find('[rel="last"]').at(0).simulate('click');

  expect(paginate.mock.calls[0]).toEqual([{pages: 3, onPage: 3, begin: 24, end: 35}]);
});

it('reports correctly when "first" is clicked', () => {
  let paginate = jest.fn();
  const pane = mount(<PaginationPane numItems={ 30 } onChange={ paginate } pageSize={ 12 } currentPage={ 2 } />);
  
  pane.find('[rel="first"]').at(0).simulate('click');

  expect(paginate.mock.calls[0]).toEqual([{pages: 3, onPage: 1, begin: 0, end: 11}]);
});

describe('individual page navigation', () => {
  it('displays each page as links to click',() => {
    let paginate = jest.fn();
    const pane = mount(<PaginationPane numItems={ 30 } onChange={ paginate } pageSize={ 12 } currentPage={ 2 } />);

    expect(pane.find('.reactTemplateBrowser-PaginationPane-pageLink').length).toEqual(3);
  });
  
  it('each page link loads the correct templates on click',() => {
    let paginate = jest.fn();
    const pane = mount(<PaginationPane numItems={ 30 } onChange={ paginate } pageSize={ 12 } currentPage={ 2 } />);
    
    pane.find('.reactTemplateBrowser-PaginationPane-pageLink').at(0).simulate('click');

    expect(paginate.mock.calls[0]).toEqual([{pages: 3, onPage: 1, begin: 0, end: 11}]);
  });
  
});

describe('static method .paginate()', () => {
  it('returns an array of correct length', () => {
    const array = [1,2,3,4,5,6];
    
    const result = PaginationPane.paginate(array, 2, 2);

    expect(result.length).toEqual(2);
  });

  it('returns an array with expected contents (REVERSE EXPECTATION)', () => {
    const array = [1,2,3,4,5,6];
    
    const result = PaginationPane.paginate(array, 2, 2);

    result.forEach( (item) =>{
      // REVERSED EXPECTATION
      expect([3, 4]).toContain(item);
    });
  });
});

describe('unavailable buttons', () => {
  it('will disable "first" on the first page', () => {
    let paginate = jest.fn();
    const pane = mount(<PaginationPane numItems={ 2 } onChange={ paginate } pageSize={ 1 } currentPage={ 1 } />);
    
    pane.find('[rel="first"]').at(0).simulate('click');

    expect(paginate.mock.calls).toEqual([]);
  });

  it('will disable "prev" on the first page', () => {
    let paginate = jest.fn();
    const pane = mount(<PaginationPane numItems={ 2 } onChange={ paginate } pageSize={ 1 } currentPage={ 1 } />);
    
    pane.find('[rel="prev"]').at(0).simulate('click');

    expect(paginate.mock.calls).toEqual([]);
  });

  it('will disable "last" on the last page', () => {
    let paginate = jest.fn();
    const pane = mount(<PaginationPane numItems={ 2 } onChange={ paginate } pageSize={ 1 } currentPage={ 2 } />);
    
    pane.find('[rel="last"]').at(0).simulate('click');

    expect(paginate.mock.calls).toEqual([]);
  });

  it('will disable "next" on the last page', () => {
    let paginate = jest.fn();
    const pane = mount(<PaginationPane numItems={ 2 } onChange={ paginate } pageSize={ 1 } currentPage={ 2 } />);
    
    pane.find('[rel="next"]').at(0).simulate('click');

    expect(paginate.mock.calls).toEqual([]);
  });

});

