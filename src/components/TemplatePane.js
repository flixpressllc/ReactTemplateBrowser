import React, { Component } from 'react';
import Template from './Template';
import TemplateGroup from './TemplateGroup';
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
      throw new Error(`Unexpected value given to Browser.handleHoveredTemplateChange. onOrOffString: ${onOrOffString}, templateId: ${ templateId }`);
    }
  }

  handleTemplateOpen (templateId, templateType) {
    this.setState({hoveredTemplate: null}, () => {
      this.props.onTemplateOpen(templateId, templateType);
    });
  }

  renderItems () {
    const templates = this.renderTemplates();
    const templateGroups = this.renderTemplateGroups();
    let totalCount = templates.length + templateGroups.length;
    return templates.concat(templateGroups);
  }

  renderTemplates () {
    return this.props.templates.map( (template, i) => {
      const templateIsHovered = this.getHoveredStateById(template.id);
      return(
        <div className='reactTemplateBrowser-TemplatePane-paneItem'
          key={`template-item-${template.id}-${i}`} >
          <Template
            template={ template }
            openTemplate={ this.handleTemplateOpen }
            userType={ this.props.userType }
            isHovered={ templateIsHovered }
            onHoverChange={ this.handleHoveredTemplateChange }
            options={ this.props.templateOptions } />
          </div>
      );
    });
  }

  renderTemplateGroups () {
    return this.props.templateGroups.map( (templateGroup, i) => {
      const isHovered = this.getHoveredStateById(templateGroup.id);
      return(
        <div className='reactTemplateBrowser-TemplatePane-paneItem'
          key={`templateGroup-item-${templateGroup.id}-${i}`} >
          <TemplateGroup
            templateGroup={ templateGroup }
            // openTemplate={ this.handleTemplateOpen }
            userType={ this.props.userType }
            isHovered={ isHovered }
            // onHoverChange={ this.handleHoveredTemplateChange }
            />
          </div>
      );
    });
  }

  render () {
    const items = this.renderItems();
    return (
      <div className='reactTemplateBrowser-TemplatePane'>
        { items }
      </div>
    )
  }
}

TemplatePane.defaultProps = {
  templates: [],
  templateGroups: [],
  templateOptions: {
    costType: 'plan'
  },
  onTemplateOpen: () => {},
  userType: 'guest',
};

export default TemplatePane;