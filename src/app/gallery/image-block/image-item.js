import React, { Component } from "react";
import "./image-item.css";

class ImageItem extends Component {
  render () {
    return (
      <div className="image-block"
           onClick={() => this.props.selectImage(this.props.image)}>
        <img className="image"
             alt={this.props.image.title}
             src={this.props.image.url}/>
      </div>
    );
  }
}

export default ImageItem;
