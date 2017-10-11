import React, { Component } from "react";
import "./gallery.css";
import {withRouter} from "react-router-dom";

//import Lightbox from "react-images";

import MOCK_DATA from "./MOCK_DATA.json";
import ImageBlock from "./ImageBlock";
import ActiveImage from "./ActiveImage";
import SearchInput from "./SearchInput";


class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      searchImages: [],
      activeImage: {},

      //---for LightBox---
      lightboxIsOpen: false,
      currentImage: 0
    };

    this.closeLightbox = this.closeLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
    this.gotoImage = this.gotoImage.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.onClickFunc = this.onClickFunc.bind(this);


    this.componentDidMount = this.componentDidMount.bind(this);
  };

  componentDidMount() {
    //get json data from the file
    const data = MOCK_DATA;
    this.setState({images: data});
    this.setState({searchImages: data});
    this.setState({activeImage: data[0]});
  };

  changeImageBlock(prop) {
    var searchText = prop['prop'].toLowerCase(),
        searchImages = this.state.searchImages,
        newImageBlock = [];

    for(let i=0; i < searchImages.length; i++) {
      if(searchImages[i]['tag'].toLowerCase().indexOf(searchText) > -1) {
        newImageBlock.push(searchImages[i]);
      }
    }

    this.setState({images: newImageBlock});
    if(newImageBlock == []){
      this.setState({activeImage: {}});
    } else {
      this.setState({activeImage: newImageBlock[0]});
    }
  };



  //---for LightBox---
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
    this.openLightbox(0, event);
  };
  //---END for LightBox---


  onAddImage = () => {
    this.props.history.push("/add-image");
  };

  render() {
    return (
      <div className="">  {/*gallery*/}
        <SearchInput onSearchTextChange={prop => this.changeImageBlock({prop})}/>

        <div className="gallery-panel d-flex">
          <div className="images-panel flex-column">
            <div>
              <ImageBlock images={this.state.images} selectImage={activeImage => this.setState({activeImage})} />
            </div>
            <p>The end</p>
          </div>

          <div className="controls-info  flex-column">
            <button type="button"
                    className="btn btn-primary btn-block btn-addImage"
                    onClick={this.onAddImage}>
              Upload images
            </button>
            <div className="info-panel">
              <ActiveImage activeImage={this.state.activeImage}/>
            </div>
          </div>
        </div> {/*gallery-panel*/}

        {/*<Lightbox
          images={[
            { src: 'https://wallpaperbrowse.com/media/images/fall-wallpapers-18.jpg' },
            { src: 'http://files.vladstudio.com/joy/the_moon_and_the_ocean/wall/vladstudio_the_moon_and_the_ocean_1024x768_signed.jpg' }
          ]}
          isOpen={this.state.lightboxIsOpen}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          onClose={this.closeLightbox}
        />*/}

      </div>
    );
  }
}

export default withRouter(Gallery);