import React, { Component } from "react";
import "./gallery.css";

import {withRouter} from "react-router-dom";

import Lightbox from "react-images";

class Gallery extends Component {
  constructor() {
    super();
    this.state = {
      lightboxIsOpen: false,
      currentImage: 0
    }
    this.closeLightbox = this.closeLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
    this.gotoImage = this.gotoImage.bind(this);
    this.openLightbox = this.openLightbox.bind(this);

    this.onClickFunc = this.onClickFunc.bind(this);
  };

  openLightbox(index, event) {
    event.preventDefault();
    this.setState({
      currentImage: index,
      lightboxIsOpen: true
    });
  };

  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false
    });
  };

  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1
    });
  };

  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1
    });
  };

  gotoImage(index) {
    this.setState({
      currentImage: index
    });
  };

  onClickFunc(event) {
    this.openLightbox(1, event);
  };


  onAddImage = () => {
    this.props.history.push("/add-image");
  };

  render() {
    return (
      <div className="">  {/*gallery*/}
        <div className="search">
          <span className="d-flex flex-row">
            <input type="text" className="form-control" placeholder="Search for..."
                   value="" onChange="" />
            <button type="button" className="btn btn-outline-secondary btn-search">
              Search
            </button>
          </span>
          <div className="search-tags">
            <i>e.g.</i>
            <a href="">dark</a>
            <a href="">nature</a>
            <a href="">wallpaper</a>
            <a href="">city</a>
          </div>
        </div>

        <div className="gallery-panel d-flex">
          <div className="images-panel flex-column">
            <div className="image-block">
              <img onClick={this.onClickFunc} className="image" alt="" src="https://wallpaperbrowse.com/media/images/fall-wallpapers-18.jpg" />
            </div>
            <div className="image-block">
              <img className="image" alt="" src="http://files.vladstudio.com/joy/the_moon_and_the_ocean/wall/vladstudio_the_moon_and_the_ocean_1024x768_signed.jpg" />
            </div>
            <div className="image-block">
              <img className="image" alt="" src="https://s-media-cache-ak0.pinimg.com/originals/06/b0/3f/06b03f3adb2f86a5c1a6085601e97933.jpg" />
            </div>
            <div className="image-block">
              <img className="image" alt="" src="https://s-media-cache-ak0.pinimg.com/originals/cf/14/7d/cf147d714341d704bf9672725fab7f20.jpg" />
            </div>
            <div className="image-block">
              <img className="image" alt="" src="http://filmvkom.ru/pic/zip/38343-free-wallpaper-for-desktop-spring.jpg" />
            </div>
            <div className="image-block">
              <img className="image" alt="" src="http://files.vladstudio.com/joy/colin_huggins/wall/vladstudio_colin_huggins_1024x768_signed.jpg" />
            </div>
            <div className="image-block">
              <img className="image" alt="" src="http://www.compdoc.ru/wallpaper/space/space8.jpg" />
            </div>
            <div className="image-block">
              <img className="image" alt="" src="https://wallpapercave.com/wp/267dVcG.jpg" />
            </div>
            <div className="image-block">
              <img className="image" alt="" src="http://wallarthd.com/wp-content/uploads/2014/11/Ice-Cave-Wallpaper-Desktop.jpg" />
            </div>
            <div className="image-block">
              <img className="image" alt="" src="https://wallpapercave.com/wp/sQMWPLe.jpg" />
            </div>
            <div className="image-block">
              <img className="image" alt="" src="https://s-media-cache-ak0.pinimg.com/originals/e3/83/c5/e383c5f78707976da167853b6f8d5efa.jpg" />
            </div>
            <div className="image-block">
              <img className="image" alt="" src="http://www.qygjxz.com/data/out/96/5244415-good-wallpapers.png" />
            </div>
            <div className="image-block">
              <img className="image" alt="" src="https://cdn-media-1.lifehack.org/wp-content/files/2013/04/55-1024x768.jpg" />
            </div>

            <p>The end</p>
          </div>

          <div className="controls-info  flex-column">
            <button type="button" className="btn btn-primary btn-block btn-addImage"
                    onClick={this.onAddImage}>
              Upload images
            </button>
            <div className="info-panel">
              <p className="info-name">
                Name: --
              </p>
              <p className="info-tags">
                Tags: --
              </p>
              <p className="info-description">
                Description: --
              </p>
            </div>
          </div>
        </div> {/*gallery-panel*/}

        <Lightbox
          images={[
            { src: 'https://wallpaperbrowse.com/media/images/fall-wallpapers-18.jpg' },
            { src: 'http://files.vladstudio.com/joy/the_moon_and_the_ocean/wall/vladstudio_the_moon_and_the_ocean_1024x768_signed.jpg' }
          ]}
          isOpen={this.state.lightboxIsOpen}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          onClose={this.closeLightbox}
        />

      </div>
    );
  }
}

export default withRouter(Gallery);