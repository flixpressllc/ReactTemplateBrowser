import React, { Component } from 'react';
import TemplateFeatures from './TemplateFeatures';
import Preview from './Preview';
import hoverIntent from 'hoverintent';
import { padLeft } from '../helpers/StringHelpers';
import { navigateToPath } from '../helpers/Navigation';
import { SUBSCRIPTION_PLAN_VALUES_HASH } from '../stores/app-settings';
import cx from 'classnames';
import './Template.css';

class TemplateGroup extends Component {

  constructor (props) {
    super(props)
    this.state = {
      isTrial: this.getIsTrial(props.userType, props.templateGroup.plan),
      isDisabled: this.getIsDisabled(props.userType, props.templateGroup.plan)
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
    const t = this.props.templateGroup;
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
    this.props.openGroup(
      this.props.templateGroup.id
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
    this.props.onHoverChange( 'on', this.props.templateGroup.id );
  }

  handleHoverOff () {
    this.props.onHoverChange( 'off', this.props.templateGroup.id );
  }

  renderHeaderText () {
    const template = this.props.templateGroup;
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
    return (this.props.isHovered) ? hoverText : `Group: ${template.name}`;
  }

  renderFooterText () {
    const template = this.props.templateGroup;
    const cost = this.props.options.costType === 'plan' ?
      `Plan: ${ template.plan }` : `Pay As You Go: ${ template.price }`;
    const upgradeLink = <span
      className='reactTemplateBrowser-TemplateGroup-upgradeLink'
      onMouseOver={ this.handleUpgradeHover }
      onMouseOut={ this.handleUpgradeUnhover }
      >Upgrade</span>;
    const regularOutput = [
      <span key='2' className='reactTemplateBrowser-TemplateGroup-priceOrPlan'>{ cost }</span>
    ];
    const upgradeMessage = <span className='reactTemplateBrowser-TemplateGroup-upgradeMessage'>{ upgradeLink } for full access</span>;
    const hoverOutput = (() => {
      switch (true) {
        case this.getIsTrial(this.props.userType, template.plan):
        case this.getIsDisabled(this.props.userType, template.plan):
          return upgradeMessage;
        default:
          return regularOutput;
      }
    })();
    return (this.props.isHovered) ? hoverOutput : regularOutput;
  }

  renderRibbons () {
    let ribbons = [];
    if (this.state.isTrial) {
      ribbons.push(
        <div key='trial' className='reactTemplateBrowser-TemplateGroup-trialRibbon'>
          Trial
        </div>
      )
    }
    ribbons.push(
      <div key='group' className='reactTemplateBrowser-TemplateGroup-groupRibbon'>
        Group
      </div>
    )

    return ribbons;
  }

  render (){
    const link = this.renderLink();
    const headerText = this.renderHeaderText();
    const footerText = this.renderFooterText();
    const ribbons = this.renderRibbons();
    const className = cx('reactTemplateBrowser-TemplateGroup', {'disabled-template': this.state.isDisabled});

    return (
      <a className={ className }
        href={ link }
        ref={ (el) => this.mountedInstance = el }
        onClick={ this.handleClickOnTemplate } >

        <header className='reactTemplateBrowser-TemplateGroup-header'>
          { headerText }
        </header>
        <div className='reactTemplateBrowser-TemplateGroup-previewArea'>
          <Preview templateId={ this.props.templateGroup.id } active={ this.props.isHovered } />
          <TemplateFeatures features={ this.props.templateGroup.features } hideBadges={ this.props.isHovered }/>
        </div>
        <div className='reactTemplateBrowser-TemplateGroup-footer'>
          { footerText }
        </div>
        { ribbons }
      </a>
    );
  }
}

TemplateGroup.defaultProps = {
  options: {
    costType: 'plan'
  }
};

export default TemplateGroup;