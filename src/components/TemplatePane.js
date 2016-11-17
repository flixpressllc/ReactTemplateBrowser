import React, { Component } from 'react';
import Template from './Template';
import './TemplatePane.css';

class TemplatePane extends Component {

  constructor (props) {
    super(props)

    this.state = {
      hoveredTemplate: null
    }

    this.handleHoveredTemplateChange = this.handleHoveredTemplateChange.bind(this);
    this.handleTemplateOpen = this.handleTemplateOpen.bind(this);
  }

  getHoveredStateById (templateId) {
    return templateId === this.state.hoveredTemplate;
  }

  handleHoveredTemplateChange (onOrOffString, templateId) {
    if ( onOrOffString === 'off' ) {
      this.setState({hoveredTemplate: null});
    } else if ( onOrOffString === 'on' ) {
      this.setState({hoveredTemplate: templateId});
    } else {
      throw `Unexpected value given to Browser.handleHoveredTemplateChange. onOrOffString: ${onOrOffString}, templateId: ${ templateId }`;
    }
  }

  handleTemplateOpen (templateId, templateType) {
    this.setState({hoveredTemplate: null}, () => {
      this.props.onTemplateOpen(templateId, templateType);
    });
  }

  renderTemplates () {
    return this.props.templates.map( (template, i) => {
      const templateIsHovered = this.getHoveredStateById(template.id);
      return(
        <Template key={`template-item-${template.id}-${i}`}
          template={ template }
          openTemplate={ this.handleTemplateOpen }
          userPlanLevel={ this.props.userType }
          isHovered={ templateIsHovered }
          onHoverChange={ this.handleHoveredTemplateChange }
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