import React, { Component } from 'react';

class Template extends Component {
  
  createLink() {
    const t = this.props.template;
    return `/templates/${t.type}.aspx?tid=${t.id}`;
  }
  
  render(){
    const link = this.createLink();
    const template = this.props.template;
    const cost = this.props.options.costType === 'plan' ? (
      <span className='dispPlan'>Plan: { template.plan }</span>
    ) : (
      <span className='dispPrice'>Pay As You Go: { template.price }</span>
    );
    return (
      <div className='template browserItem'>
        <header className='browserInnerItem'>
          { `ID:${template.id} ${template.name}` }
        </header>
        <a href={ link }>
          <img src={ template.image } alt={`Screenshot of template ${template.id}`} />
        </a>
        <div className='browserSubTitleDiv'>
          <span className='tempDur'>Duration: { template.duration }</span>
          { cost }
        </div>
      </div>
    );
  }
}

Template.defaultProps = {
  options: {
    costType: 'plan'
  }
};

export default Template;