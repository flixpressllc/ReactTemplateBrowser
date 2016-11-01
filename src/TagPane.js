import React, { Component } from 'react';

class TagPane extends Component {
  
  render() {
    let tags = this.props.tags.map( (tagName,i)=>{
      return (<span key={i}>{tagName}</span>);
    } );
    return (
      <div className='tag-pane'>
        { tags }
      </div>
    )
  }
}

TagPane.defaultProps = {
  tags: []
};

export default TagPane;