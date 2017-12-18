import React, { Component } from "react";
import "./active-image.css";

class ActiveImage extends Component {
  render () {
    if (this.props.activeImage === undefined) {
      return (<h4>Nothing found</h4>);
    }
    if (this.props.activeImage.id === undefined) {
      return (<span>Loading...</span>);
    }
    else {
      return (
        <div>
          <div className="info__image">
            <img alt={this.props.activeImage.title}
                 src={this.props.activeImage.url}/>
          </div>
          <p className="info__name">
            <span className="info__titles">Name: </span>
            {this.props.activeImage.title}
          </p>
          <p className="info__tags">
            <span className="info__titles">Tags: </span>
            {this.props.activeImage.tags.join(', ')}
          </p>
          <p className="info__description">
            <span className="info__titles">Description: </span>
            {this.props.activeImage.descr}
          </p>
        </div>
      );
    }
  }
}

export default ActiveImage;