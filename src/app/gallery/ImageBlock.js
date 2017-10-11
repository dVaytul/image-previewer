import React, { Component } from "react";
import ImageItem from "./ImageItem";

const ImageBlock = (props) => {
  const imageItems = props.images.map((image) => {
    return (
      <ImageItem
        key={image.id}
        image={image}
        selectImage={props.selectImage}
      />
    );
  });

  return (
    <div>{imageItems}</div>
  );
};

export default ImageBlock;