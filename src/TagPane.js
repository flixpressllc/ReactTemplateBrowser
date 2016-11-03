import React, { Component } from 'react';
import './TagPane.css';

class TagPane extends Component {
  
  constructor(props){
    super(props);

    this.handleTagChoose = this.handleTagChoose.bind(this);
  }
  
  handleTagChoose(e) {
    const tagName = e.target.innerHTML.trim();
    this.setState({
      chosenTag: tagName
    });
    if (tagName === 'all') {
      this.props.chooseTag(null);
      return;
    }
    this.props.chooseTag(tagName);
  }
  
  createTagLinks(tagNamesArray) {
   return tagNamesArray.map( (tagName, i) => {
      return (
        <a key={`tagNames-${i}`}
          className='tag'
          href="#no-op"
          onClick={this.handleTagChoose}>{ tagName }</a>
      );
    });
  }

  render() {
    let tags = this.createTagLinks(this.props.tags);
    return (
      <div className='tag-pane'>
        <a className='tag-all'
          href="#no-op"
          onClick={this.handleTagChoose}>all</a>
        { tags }
      </div>
    )
  }
}

TagPane.defaultProps = {
  tags: []
};

export default TagPane;