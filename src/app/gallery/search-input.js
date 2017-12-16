import React, { Component } from "react";
import "./search-input.css";
import $ from "jquery";
import {Link} from "react-router-dom";
import SuggestBlock from "./suggest-block";

class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: []
    };
  };

  onInputChange = (searchText) => {
    this.setState({searchText: searchText});
    this.props.onSearchTextChange(searchText);
    this.showSuggest(searchText);
  };

  onChangeBySuggest = (searchText) => {
    this.setState({searchText: searchText});
    this.props.onSearchTextChange2(searchText);
    this.closeSuggest();
  };

  showSuggest = (searchText) => {
    let suggestions = $(".search__suggestions");
    if(searchText !== null && suggestions.hasClass("search__suggestions--hidden")) {
      suggestions.removeClass("search__suggestions--hidden");
    }
  };

  closeSuggest = _=> {
    $(".search__suggestions").addClass("search__suggestions--hidden");
  };

  render() {
    return (
      <div className="search">
        <span className="d-flex flex-row">
          <input className="form-control search__text"
                 type="text"
                 placeholder="Search by tag..."
                 value={this.state.searchText}
                 onChange={event => this.onInputChange(event.target.value)}/>
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
    );
  }
}

export default SearchInput;