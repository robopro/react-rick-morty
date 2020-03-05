import React from 'react';
import Pagination from 'react-bootstrap/Pagination';
import './CharacterListPagination.css';

// This is a hell of a lot of work for a simple pagination bar.
// Lemme know if you know how this can be refactored ;P
class CharacterListPagination extends React.Component {
  state = {
    firstProps: {
      active: false,
      disabled: false
    },
    lastProps: {
      active: false,
      disabled: false
    },
    ellipsisFirstDisplay: '',
    ellipsisLastDisplay: 'd-none',
    nextPage: 2,
    prevPage: 1,
    currentElements: []
  };

  onPaginationClick(page) {
    this.props.paginationClicked(page);
  }

  /** Props needed to enable/disable the first three and last three pagination buttons */
  setElementProps() {
    const currentPage = this.props.currentPage;
    let firstProps = this.state.firstProps;
    let lastProps = this.state.lastProps;
    
    if (currentPage === 1) {
      firstProps.active = true;
      firstProps.disabled = true;
    } else if (currentPage === this.props.pages) {
      lastProps.active = true;
      lastProps.disabled = true;
    }
    
    return { first: firstProps, last: lastProps };
  }
  
  /** Creates the necessary pagination elements between the ellipses */
  setCurrentElements() {
    const currentPage = this.props.currentPage;
    const pages = this.props.pages;
    const elements = [];
    
    if (currentPage > 2) {
      const prevPage = currentPage - 1;
      elements.push(<Pagination.Item key={elements.length + 1} onClick={ () => this.onPaginationClick(prevPage) }>{ prevPage }</Pagination.Item>);
    }
    if (currentPage > 1 && currentPage < pages) {
      elements.push(<Pagination.Item key={elements.length + 1} active disabled>{ currentPage }</Pagination.Item>);
    }
    if (currentPage < pages - 1) {
      const nextPage = currentPage + 1;
      elements.push(<Pagination.Item key={elements.length + 1} onClick={ () => this.onPaginationClick(nextPage) } >{ nextPage }</Pagination.Item>);
    }
    return elements;
  }

  /** Updates state */
  componentDidMount() {
    const currentPage = this.props.currentPage;
    const elementProps = this.setElementProps();
    const currentElements = this.setCurrentElements();

    this.setState({
      firstProps: elementProps.first,
      lastProps: elementProps.last,
      ellipsisFirstDisplay: currentPage > 3 ? '' : 'd-none',
      ellipsisLastDisplay: currentPage < this.props.pages -  2 ? '' : 'd-none',
      nextPage: currentPage + 1,
      prevPage: currentPage - 1,
      currentElements: currentElements
    })
  }

  render() {
    const { pages } = this.props;
    const { firstProps, lastProps, ellipsisFirstDisplay, ellipsisLastDisplay, nextPage, prevPage, currentElements } = this.state

    return (
      <Pagination>
        <Pagination.First {...firstProps} onClick={ () => this.onPaginationClick(1) } />
        <Pagination.Prev  {...firstProps} onClick={ () => this.onPaginationClick(prevPage) } />
        <Pagination.Item {...firstProps} onClick={ () => this.onPaginationClick(1) } >{1}</Pagination.Item>
        <Pagination.Ellipsis disabled className={ellipsisFirstDisplay} />
        { currentElements }
        <Pagination.Ellipsis disabled className={ellipsisLastDisplay} />
        <Pagination.Item {...lastProps} onClick={ () => this.onPaginationClick(pages) }>{pages}</Pagination.Item>
        <Pagination.Next {...lastProps} onClick={ () => this.onPaginationClick(nextPage) } />
        <Pagination.Last {...lastProps} onClick={ () => this.onPaginationClick(pages) }/>
      </Pagination>
    );
  }
}

export default CharacterListPagination;