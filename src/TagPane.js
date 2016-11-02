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
    this.props.chooseTag(tagName);
  }
  
  createTagLinks(tagNamesArray) {
   return tagNamesArray.map( (tagName, i) => {
      return (
        <a key={`tagNames-${i}`}
          href="#no-op"
          onClick={this.handleTagChoose}>{ tagName }</a>
      );
    });
  }

  render() {
    let tags = this.createTagLinks(this.props.tags);
    return (
      <div className='tag-pane'>
        { tags }
      </div>
    )
  }
}

TagPane.defaultProps = {
  tags: []
};

export default TagPane;