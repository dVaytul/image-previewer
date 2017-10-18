import React, { Component } from "react";
import "./gallery.css";
import {withRouter} from "react-router-dom";
import DATA from "./DATA.json";
import ImageBlock from "./image-block";
import ActiveImage from "./active-image";
import SearchInput from "./search-input";

import ReactModal from "react-modal";
import AddImagePanel from "./add-image";

//import Lightbox from "react-images";

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      searchImages: [],
      activeImage: {},

      //---for ModalWindow---
      showModal: false,

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

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  };

  componentDidMount() {  //get json data from the file
    const data = DATA;
    this.setState({images: data});
    this.setState({searchImages: data});
    this.setState({activeImage: data[0]});
  };

  changeImageBlock(prop) {
    let searchText = prop['prop'].toLowerCase(),
        searchImages = this.state.searchImages,
        newImageBlock = [];

    if(!searchText) {
      newImageBlock = searchImages;
    } else {
      for (let i = 0; i < searchImages.length; i++) {
        let arr = searchImages[i]['tags'];
        for (let j = 0; j < arr.length; j++) {
          if (arr[j].toLowerCase().indexOf(searchText) > -1) {
            newImageBlock.push(searchImages[i]);
            j = arr.length;
          }
        }
      }
    }

    this.setState({images: newImageBlock});
    if(newImageBlock == []){
      this.setState({activeImage: {}});
    } else {
      this.setState({activeImage: newImageBlock[0]});
    }
  };

  //---for ModalWindow---
  handleOpenModal () {
    this.setState({ showModal: true });
  };

  handleCloseModal () {
    this.setState({ showModal: false });
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
    //this.props.history.push("/add-image");
    this.handleOpenModal();
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

        <ReactModal isOpen={this.state.showModal}
                    onRequestClose={this.handleCloseModal}
                    className="Modal"
                    overlayClassName="Overlay"
        >
          <AddImagePanel func={this.handleCloseModal} images={this.state.images}/>
        </ReactModal>

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