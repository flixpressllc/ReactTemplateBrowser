import React, { Component } from 'react';
import TemplateFeatures from './TemplateFeatures';
import Preview from './Preview';
import hoverIntent from 'hoverintent';
import { padLeft } from '../helpers/StringHelpers';
import { navigateToPath } from '../helpers/Navigation';
import { SUBSCRIPTION_PLAN_VALUES_HASH } from '../stores/app-settings';
import cx from 'classnames';
import './Template.css';

class Template extends Component {
  
  constructor (props) {
    super(props)
    this.state = {
      isTrial: this.getIsTrial(props.userType, props.template.plan),
      isDisabled: this.getIsDisabled(props.userType, props.template.plan)
    }

    this.navigateToPath = navigateToPath; // allows for testing

    this.handleHoverOn = this.handleHoverOn.bind(this);
    this.handleHoverOff = this.handleHoverOff.bind(this);
    this.handleClickOnTemplate = this.handleClickOnTemplate.bind(this);
    this.renderHeaderText = this.renderHeaderText.bind(this);
    this.renderFooterText = this.renderFooterText.bind(this);
    this.handleUpgradeHover = this.handleUpgradeHover.bind(this);
    this.handleUpgradeUnhover = this.handleUpgradeUnhover.bind(this);
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

  renderLink () {
    const t = this.props.template;
    const templateLink = `/templates/${t.type}.aspx?tid=${t.id}`;
    const upgradeLink = '/upgrade';
    return this.state.upgradeHover ? upgradeLink : templateLink ;
  }

  getIsTrial (userType, templatePlan) {
    if (userType === 'guest') return false;
    return SUBSCRIPTION_PLAN_VALUES_HASH[userType] + 1 === SUBSCRIPTION_PLAN_VALUES_HASH[templatePlan]
  }

  getIsDisabled (userType, templatePlan) {
    if (userType === 'guest') return false;
    return SUBSCRIPTION_PLAN_VALUES_HASH[userType] + 1 < SUBSCRIPTION_PLAN_VALUES_HASH[templatePlan]
  }

  getVideoId (id) {
    return padLeft(id, '0', 2);
  }

  handleClickOnTemplate (e) {
    e.preventDefault();
    if (this.state.upgradeHover) {
      this.navigateToPath(this.renderLink());
      return;
    }
    this.props.openTemplate(
      this.props.template.id,
      this.props.template.type
    )
  }

  handleUpgradeHover () {
    this.setState({
      upgradeHover: true
    })
  }

  handleUpgradeUnhover () {
    this.setState({
      upgradeHover: false
    })
  }

  handleHoverOn () {
    this.props.onHoverChange( 'on', this.props.template.id );
  }

  handleHoverOff () {
    this.props.onHoverChange( 'off', this.props.template.id );
  }

  renderHeaderText () {
    const template = this.props.template;
    const hoverText = (() => {
      switch (true) {
        case (this.props.userType === 'guest'):
          return 'Login to edit';
        case this.getIsTrial(this.props.userType, template.plan):
          return 'Click to try';
        case this.getIsDisabled(this.props.userType, template.plan):
          return 'Click to preview only';
        default:
          return 'Click to edit';
      }
    })();
    return (this.props.isHovered) ? hoverText : `ID:${template.id} ${template.name}`;
  }

  renderFooterText () {
    const template = this.props.template;
    const cost = this.props.options.costType === 'plan' ?
      `Plan: ${ template.plan }` : `Pay As You Go: ${ template.price }`;
    const upgradeLink = <button 
      className='reactTemplateBrowser-Template-upgradeLink'
      onMouseOver={ this.handleUpgradeHover }
      onMouseOut={ this.handleUpgradeUnhover }
      >Upgrade</button>;
    const regularOutput = [
      <span key='1' className='reactTemplateBrowser-Template-duration'>Duration: { template.duration }</span>,
      <span key='2' className='reactTemplateBrowser-Template-priceOrPlan'>{ cost }</span>
    ];
    const hoverOutput = (() => {
      switch (true) {
        case this.getIsTrial(this.props.userType, template.plan):
          return <span>or { upgradeLink } for full access</span>;
        // case this.getIsDisabled(this.props.userType, template.plan):
        //   return 'Click to preview only';
        default:
          return regularOutput;
      }
    })();
    return (this.props.isHovered) ? hoverOutput : regularOutput;
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
    return hasRibbons ?  ribbons : null ;
  }

  render (){
    const link = this.renderLink();
    const headerText = this.renderHeaderText();
    const footerText = this.renderFooterText();
    const ribbons = this.renderRibbons();
    const className = cx('reactTemplateBrowser-Template template browserItem', {'disabled-template': this.state.isDisabled});

    return (
      <a className={ className }
        href={ link }
        ref={ (el) => this.mountedInstance = el }
        onClick={ this.handleClickOnTemplate } >

        <header className='browserInnerItem'>
          { headerText }
        </header>
        <div className='reactTemplateBrowser-Template-previewArea'>
          <Preview templateId={ this.props.template.id } active={ this.props.isHovered } />
          <TemplateFeatures features={ this.props.template.features } hideBadges={ this.props.isHovered }/>
        </div>
        <div className='browserSubTitleDiv'>
          { footerText }
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