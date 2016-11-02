import React, { Component } from 'react';

class TemplateItem extends Component {
  render(){
    return (
      <div className='template'>
        <header>{ this.props.item.name }</header>
      </div>
    );
  }
}

export default TemplateItem;