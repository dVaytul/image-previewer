import React, { Component } from "react";

const ActiveImage = (props) => {
  if(props.activeImage == undefined) {
    return (<h4>Nothing found</h4>);
  }
  if(props.activeImage.id == undefined) {
    return (<span>Loading...</span>);
  }
  else {
    return (
      <div>
        <div className="info-image">
          <img src={props.activeImage.url} />
        </div>
        <p className="info-name">
          Name: {props.activeImage.title}
        </p>
        <p className="info-tags">
          Tags: {props.activeImage.tag}
        </p>
        <p className="info-description">
          Description:
        </p>
      </div>
    );
  }
};

export default ActiveImage;