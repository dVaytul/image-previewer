import React, { Component } from "react";
import "./search-input.css";
import $ from "jquery";
import SuggestBlock from "./suggest-block";

class SearchInput extends Component {
  constructor(props) {
    super(props);
  };

  onInputChange(searchText) {
    let suggestions = $(".search__suggestions");

    this.props.onSearchTextChange(searchText);

    if(searchText !== null && suggestions.hasClass("search__suggestions--hidden")) {
      suggestions.removeClass("search__suggestions--hidden");
    }
    
  };

  closeSuggestionsList(){
    $(".search__suggestions").addClass("search__suggestions--hidden");
  };

  render() {
    return (
      <div className="search">
        <span className="d-flex flex-row">
          <input className="form-control"
                 type="text"
                 placeholder="Search by tag..."
                 onChange={event => this.onInputChange(event.target.value)}
                 onBlur={this.closeSuggestionsList}/>
        </span>

        <div className="search__suggestions search__suggestions--hidden">
          <SuggestBlock suggestions={this.props.searchSuggestions}/>
        </div>

        <div className="search__tags">
          <i>e.g.</i>
          <a href="#">officia</a>
          <a href="#">amet</a>
          <a href="#">dolore</a>
          <a href="#">elit</a>
        </div>
      </div>
    );
  }
}

export default SearchInput;