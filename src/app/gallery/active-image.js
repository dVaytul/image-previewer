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
            Name: {this.props.activeImage.title}
          </p>
          <p className="info-tags">
            Tags: {this.props.activeImage.tag}
          </p>
          <p className="info-description">
            Description:
          </p>
        </div>
      );
    }
  }
}

export default ActiveImage;