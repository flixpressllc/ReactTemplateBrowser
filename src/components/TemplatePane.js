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
    this.handleGroupOpen = this.handleGroupOpen.bind(this);
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

  handleGroupOpen (groupId) {
    this.setState({hoveredTemplate: null}, () => {
      this.props.onGroupOpen(groupId);
    });
  }

  renderItems () {
    return this.props.templates.map( (template, i) => {
      const templateIsHovered = this.getHoveredStateById(template.id);
      const isTemplate = template.children === undefined;
      const TemplateOrGroup = isTemplate ? Template : TemplateGroup;
      let props = {
        userType: this.props.userType,
        isHovered: templateIsHovered,
        onHoverChange: this.handleHoveredTemplateChange,
        options: this.props.templateOptions
      };
      if (isTemplate) {
        props.template = template;
        props.openTemplate = this.handleTemplateOpen;
      } else {
        // is TemplateGroup
        props.templateGroup = template;
        props.openGroup = this.handleGroupOpen;
      }
      return(
        <div className='reactTemplateBrowser-TemplatePane-paneItem'
          key={`template-item-${template.id}-${i}`} >
          <TemplateOrGroup { ...props }/>
          </div>
      );
    });
  }

  render () {
    const items = this.renderItems();
    return (
      <div className='reactTemplateBrowser-TemplatePane'>
        <div className='reactTemplateBrowser-TemplatePane-templateField'>
          { items }
        </div>
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