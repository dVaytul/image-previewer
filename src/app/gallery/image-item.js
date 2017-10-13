import React, { Component } from "react";

class ImageItem extends Component {
  render () {
    return (
      <div className="image-block" onClick={() => this.props.selectImage(this.props.image)}>
        <img className="image" alt="" src={this.props.image.url}/>
      </div>
    );
  }
}

export default ImageItem;
