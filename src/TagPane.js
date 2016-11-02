import React, { Component } from 'react';

class TagPane extends Component {
  
  handleTagChoose(e) {
    let clickedName = e.target.innerHtml;
  }
  
  createTagLinks(tagNamesArray) {
   return tagNamesArray.map( (tagName, i) => {
      return (
        <a key={`tagNames-${i}`}
          href="#no-op"
          onClick={this.handleTagChoose}> { tagName } </a>
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