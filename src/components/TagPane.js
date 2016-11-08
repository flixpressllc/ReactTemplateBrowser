import React, { Component } from 'react';
import StringHelpers from '../helpers/StringHelpers';
import '../css/TagPane.css';

const slugify = StringHelpers.slugify;

const allTemplatesTag = 'All Templates';

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
    tags.unshift( allTemplatesTag );
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
    if (tagName === allTemplatesTag) {
      this.props.chooseTag(null);
      return;
    }
    this.props.chooseTag(tagName);
  }
  
  createTagLinks(tagNamesArray) {
   return tagNamesArray.map( (tagName, i) => {
      let className = (tagName === allTemplatesTag) ? 'tag-all' : 'tag';
      if (tagName === this.props.activeTag) {
        className += ' active-tag';
      }
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