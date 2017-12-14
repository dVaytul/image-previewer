import React, { Component } from "react";
import "./suggest-item.css";

class SuggestItem extends Component {
  render () {
    return (
      <div className="suggestions__item">
        {this.props.tag}
      </div>
    );
  }
}

export default SuggestItem;