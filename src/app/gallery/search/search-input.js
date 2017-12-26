import React, { Component } from "react";
import "./search-input.css";
import $ from "jquery";
import {Link} from "react-router-dom";
import SuggestBlock from "./suggest-block/suggest-block";

class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: []
    };
  };

  onInputChange = (searchText) => {
    this.setState({searchText: searchText});
    this.props.onSearchTextChange(searchText, false);
    this.showSuggest(searchText);
  };

  onChangeBySuggest = (searchText) => {
    this.setState({searchText: searchText});
    this.props.onSearchTextChange(searchText, true);
    this.closeSuggest();
  };

  showSuggest = (searchText) => {
    let suggestions = $(".search__suggestions");
    if(searchText !== null && suggestions.hasClass("search__suggestions--hidden")) {
      suggestions.removeClass("search__suggestions--hidden");
    }
    $(".out-of-search").removeClass("out-of-search--hidden");
  };

  closeSuggest = _=> {
    $(".search__suggestions").addClass("search__suggestions--hidden");
    $(".out-of-search").addClass("out-of-search--hidden");
  };

  handlePressedKey = (event) => {
    if(event.key === "Enter") {
      event.preventDefault();
      this.closeSuggest();
    }

    if(event.key === "ArrowDown") {
      event.preventDefault();
    }

    if(event.key === "ArrowUp") {
      event.preventDefault();
    }
  };

  render() {
    return (
      <div>
        <div className="search">
          <span className="d-flex flex-row">
            <input className="form-control search__text"
                   type="text"
                   placeholder="Search by tag..."
                   value={this.state.searchText}
                   onChange={event => this.onInputChange(event.target.value)}
                   onKeyDown={this.handlePressedKey}/>
          </span>

          <div className="search__suggestions search__suggestions--hidden">
            <SuggestBlock suggestions={this.props.searchSuggestions}
                          onSelectBlock={this.onChangeBySuggest}/>
          </div>

          <div className="search__tags">
            <i>e.g.</i>
            <Link to="/gallery">officia</Link>
            <Link to="/gallery">amet</Link>
            <Link to="/gallery">dolore</Link>
            <Link to="/gallery">elit</Link>
          </div>
        </div>
        <div className="out-of-search out-of-search--hidden"
             onClick={this.closeSuggest}/>
      </div>
    );
  }
}

export default SearchInput;