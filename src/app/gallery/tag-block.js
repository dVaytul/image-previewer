import React, { Component } from 'react';
import TagItem from "./tag-item";

class TagBlock extends Component {
  render () {
    const tagItems = this.props.tagsArr.map((tag) => {
      return (
        <TagItem
          key={tag.id}
          tag={tag}
          deleteTag={this.props.deleteTag}
        />
      );
    });

    return (
      <div>{tagItems}</div>
    );
  }
}

export default TagBlock;

