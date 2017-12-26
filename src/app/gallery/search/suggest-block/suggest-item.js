import React, { Component } from "react";
import "./suggest-item.css";

class SuggestItem extends Component {
  onSelectSuggest = () => {
    this.props.onSelectItem(this.props.tag)
  };

  render () {
    return (
      <div className="suggestions__item"
           onClick={this.onSelectSuggest}
           onKeyDown={(event) => { if(event.key === "Enter") this.onSelectSuggest();} }>
        {this.props.tag}
      </div>
    );
  }
}

export default SuggestItem;