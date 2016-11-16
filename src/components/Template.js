import React, { Component } from 'react';
import TemplateFeatures from './TemplateFeatures';
import Preview from './Preview';
import hoverIntent from 'hoverintent';
import { padLeft } from '../helpers/StringHelpers';
import { PLAN_VALUES_HASH } from '../stores/app-settings';
import cx from 'classnames';
import './Template.css';

class Template extends Component {
  
  constructor (props) {
    super(props)
    this.state = {
      isHovered: false,
      isTrial: this.getIsTrial(props.userPlanLevel, props.template.plan),
      isDisabled: this.getIsDisabled(props.userPlanLevel, props.template.plan)
    }

    this.handleHoverOn = this.handleHoverOn.bind(this);
    this.handleHoverOff = this.handleHoverOff.bind(this);
    this.handleClickOnTemplate = this.handleClickOnTemplate.bind(this);
  }

  componentDidMount () {
    this.hoverIntentListener = hoverIntent(this.mountedInstance, () => {
      this.handleHoverOn();
    }, () => {
      this.handleHoverOff();
    });
  }

  componentWillUnmount () {
    this.hoverIntentListener.remove();
  }

  createLink () {
    const t = this.props.template;
    return `/templates/${t.type}.aspx?tid=${t.id}`;
  }

  getIsTrial (userPlanLevel, templatePlanLevel) {
    if (userPlanLevel === 'guest') return false;
    return PLAN_VALUES_HASH[userPlanLevel] + 1 === PLAN_VALUES_HASH[templatePlanLevel]
  }

  getIsDisabled (userPlanLevel, templatePlanLevel) {
    if (userPlanLevel === 'guest') return false;
    return PLAN_VALUES_HASH[userPlanLevel] + 1 < PLAN_VALUES_HASH[templatePlanLevel]
  }

  getVideoId (id) {
    return padLeft(id, '0', 2);
  }

  handleClickOnTemplate (e) {
    e.preventDefault();
    this.handleHoverOff();
    this.props.openTemplate(
      this.props.template.id,
      this.props.template.type
    )
  }

  handleHoverOn () {
    this.setState({isHovered: true})
  }

  handleHoverOff () {
    this.setState({
      isHovered: false
    })
  }
  
  renderRibbons () {
    let ribbons = [];
    let hasRibbons = false;
    if (this.state.isTrial) {
      hasRibbons = true;
      ribbons.push(
        <div key='trial' className='reactTemplateBrowser-Template-trialRibbon'>
          Trial
        </div>
      )
    }
    return ( hasRibbons ? 
      <div className='reactTemplateBrowser-Template-ribbonPlaceholder'>
        { ribbons }
      </div>
      : null
    );
  }

  render (){
    const link = this.createLink();
    const template = this.props.template;
    const cost = this.props.options.costType === 'plan' ?
      `Plan: ${ template.plan }` : `Pay As You Go: ${ template.price }`;

    const headerText = (this.state.isHovered) ? 'Click to edit' : `ID:${template.id} ${template.name}`;

    const ribbons = this.renderRibbons();

    const className = cx('reactTemplateBrowser-Template template browserItem', {'disabled-template': this.state.isDisabled});

    return (
      <a className={ className }
        href={ link }
        ref={ (el) => this.mountedInstance = el } 
        onClick={ this.handleClickOnTemplate }
        >
        <header className='browserInnerItem'>
          { headerText }
        </header>
        <div className='reactTemplateBrowser-Template-previewArea'>
          <Preview templateId={ this.props.template.id } active={ this.state.isHovered } />
          <TemplateFeatures features={ this.props.template.features } hideBadges={ this.state.isHovered }/>
        </div>
        <div className='browserSubTitleDiv'>
          <span className='reactTemplateBrowser-Template-duration'>Duration: { template.duration }</span>
          <span className='reactTemplateBrowser-Template-priceOrPlan'>{ cost }</span>
        </div>
        { ribbons }
      </a>
    );
  }
}

Template.defaultProps = {
  options: {
    costType: 'plan'
  }
};

export default Template;