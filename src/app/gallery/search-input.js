import React, { Component } from "react";

class SearchInput extends Component {
  constructor(props) {
    super(props);
  };

  onInputChange(searchText) {
    this.props.onSearchTextChange(searchText);
  };

  render() {
    return (
      <div className="search">
          <span className="d-flex flex-row">
            <input className="form-control"
                   type="text"
                   placeholder="Search by tag..."
                   onChange={event => this.onInputChange(event.target.value)}
            />
          </span>
        <div className="search-tags">
          <i>e.g.</i>
          <a href="">officia</a>
          <a href="">amet</a>
          <a href="">dolore</a>
          <a href="">elit</a>
        </div>
      </div>
    );
  }
}

export default SearchInput;