import React, { Component } from 'react';
import StringHelpers from '../helpers/StringHelpers';
import cx from 'classnames';
import '../css/TagPane.css';

const slugify = StringHelpers.slugify;

const ALL_TEMPLATES_TAG_NAME = 'All Templates';

class TagPane extends Component {
  
  constructor(props){
    super(props);
    this.createTagMap(props.tags);
    this.handleTagChoose = this.handleTagChoose.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.tags !== this.props.tags) {
      this.createTagMap(newProps.tags);
    }
  }

  createTagMap(tags) {
    this.tagMap = {};
    tags.unshift( ALL_TEMPLATES_TAG_NAME );
    tags.forEach( (tag) => {
      this.setTag(tag)
    });
  }

  setTag(tag) {
    this.tagMap[ this.getTagSlugFromName(tag) ] = tag;
  }

  getTagNameFromSlug(tagSlug) {
    return this.tagMap[ tagSlug ];
  }

  getTagSlugFromName(tagName) {
    return slugify(tagName);
  }
  
  handleTagChoose(e) {
    const tagSlug = e.target.hash.substr(1);
    const tagName = this.getTagNameFromSlug(tagSlug);
    if (tagName === ALL_TEMPLATES_TAG_NAME) {
      this.props.chooseTag(null);
      return;
    }
    this.props.chooseTag(tagName);
  }
  
  createTagLinks(tagNamesArray) {
   return tagNamesArray.map( (tagName, i) => {
      const isAllTempsTag = tagName === ALL_TEMPLATES_TAG_NAME;
      const isActiveTag = tagName === this.props.activeTag;
      const baseName = 'reactTemplateBrowser-TagPane-tag'; 
      let className = cx(baseName, {'all-tag': isAllTempsTag, 'active-tag': isActiveTag});
      return (
        <a key={`tagNames-${i}`}
          className={ className }
          href={ `#${ this.getTagSlugFromName(tagName) }` }
          onClick={ this.handleTagChoose }>{ tagName }</a>
      );
    });
  }

  render() {
    let tags = this.createTagLinks(this.props.tags);
    return (
      <div className='reactTemplateBrowser-TagPane'>
        { tags }
      </div>
    )
  }
}

TagPane.defaultProps = {
  tags: []
};

export default TagPane;