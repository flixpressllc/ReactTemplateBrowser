import React, { Component } from 'react';

class Template extends Component {
  
  createLink() {
    const t = this.props.template;
    return `/templates/${t.type}.aspx?tid=${t.id}`;
  }
  
  render(){
    const link = this.createLink();
    const template = this.props.template;
    return (
      <div className='template'>
        <header>{ template.name }</header>
        <a href={ link }>Click here</a>
      </div>
    );
  }
}

export default Template;