import React, { Component } from "react";
import TagItem from "./tag-item";

class TagBlock extends Component {
  render () {
    const tagItems = this.props.tagsArr.map((tag, index) => {
      return (
        <TagItem key={index}
                 tag={tag}
                 deleteTag={() => this.props.deleteTag(index)}/>
      );
    });

    return (
      <div>{tagItems}</div>
    );
  }
}

export default TagBlock;

