import React, { Component } from "react";

class ActiveImage extends Component {
  render () {
    if (this.props.activeImage == undefined) {
      return (<h4>Nothing found</h4>);
    }
    if (this.props.activeImage.id == undefined) {
      return (<span>Loading...</span>);
    }
    else {
      return (
        <div>
          <div className="info-image">
            <img src={this.props.activeImage.url}/>
          </div>
          <p className="info-name">
            <span className="info-titles">Name: </span>{this.props.activeImage.title}
          </p>
          <p className="info-tags">
            <span className="info-titles">Tags: </span>{this.props.activeImage.tags.join(', ')}
          </p>
          <p className="info-description">
            <span className="info-titles">Description: </span>{this.props.activeImage.descr}
          </p>
        </div>
      );
    }
  }
}

export default ActiveImage;