import React, { Component } from "react";
import "./tag-item.css";

class TagItem extends Component {
  render () {
    return (
      <div className="tag-item">
        <span className="tag-item__name">
          {this.props.tag}
        </span>
        <button type="button"
                className="tag-item__btn-delete btn btn-outline-danger btn-sm"
                onClick={() => this.props.deleteTag(this.props.tag.id)}>
          [x]
        </button>
      </div>
    );
  }
}

export default TagItem;