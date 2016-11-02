import React, { Component } from 'react';

class TemplateItem extends Component {
  
  createLink() {
    const t = this.props.item;
    return `/templates/${t.type}.aspx?tid=${t.id}`;
  }
  
  render(){
    const link = this.createLink();
    const template = this.props.item;
    return (
      <div className='template'>
        <header>{ template.name }</header>
        <a href={ link }>Click here</a>
      </div>
    );
  }
}

export default TemplateItem;