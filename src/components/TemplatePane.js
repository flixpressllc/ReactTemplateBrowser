import React, { Component } from 'react';
import Template from './Template';
import './TemplatePane.css';

class TemplatePane extends Component {

  renderTemplates () {
    return this.props.templates.map( (template, i) => {
      return(
        <Template key={`template-item-${i}`}
          template={ template }
          openTemplate={ this.props.onTemplateOpen }
          userPlanLevel={ this.props.userType }
          options={ this.props.templateOptions } />
      );
    });
  }

  render () {
    const templates = this.renderTemplates();
    return (
      <div className='reactTemplateBrowser-TemplatePane'>
        { templates }
      </div>
    )
  }
}

TemplatePane.defaultProps = {
  templates: [],
  templateOptions: {
    costType: 'plan'
  },
  onTemplateOpen: () => {},
  userType: 'guest',
};

export default TemplatePane;