import React, { Component } from "react";
import SuggestItem from "./suggest-item";

class SuggestBlock extends Component {
  render () {
    let suggest = this.props.suggestions;

    if(suggest.length > 8) {
      suggest = suggest.slice(0,8);
    }

    const suggestItems = suggest.map((tag, index) => {
      return (
        <SuggestItem key={index}
                     tag={tag}
                     onSelectItem={this.props.onSelectBlock}/>
      );
    });

    return (
      <div>
        {suggestItems}
      </div>
    );
  }
}

export default SuggestBlock;