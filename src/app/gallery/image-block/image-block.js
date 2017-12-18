import React, { Component } from "react";
import ImageItem from "./image-item";

class ImageBlock extends Component {
  render () {
    const imageItems = this.props.images.map((image) => {
      return (
        <ImageItem key={image.id}
                   image={image}
                   selectImage={this.props.selectImage}/>
      );
    });

    return (
      <div>{imageItems}</div>
    );
  }
}

export default ImageBlock;