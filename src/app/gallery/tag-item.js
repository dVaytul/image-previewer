import React, { Component } from 'react';

class TagItem extends Component {
  render () {
    return (
      <div className="tag-item">
        <span className="tag-item-name">
          {this.props.tag}
        </span>
        <button type="button"
                className="tag-item-delete btn btn-primary"
                onClick={() => this.props.deleteTag(this.props.tag)}
        >
          [x]
        </button>
      </div>
    );
  }
}

export default TagItem;