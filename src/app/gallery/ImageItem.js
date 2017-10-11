import React, { Component } from "react";

const ImageItem  = ({image, selectImage}) => {
  return (
    <div className="image-block" onClick={() => selectImage(image)}>
      <img className="image" alt=""
           src={image.url}
      />
    </div>
  );
};

export default ImageItem;
