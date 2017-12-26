import React, { Component } from "react";
import "./gallery.css";
import {withRouter} from "react-router-dom";
import ReactModal from "react-modal";
import $ from "jquery";
import {debounce} from "throttle-debounce";
import ImageBlock from "./image-block/image-block";
import ActiveImage from "./active-image/active-image";
import SearchInput from "./search/search-input";
import AddImagePanel from "./add-image/add-image";
import ImageService from "../service/image-service";

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      searchImages: [],
      searchSuggestions: [],
      activeImage: {},
      showModal: false
    };

    this.loadMoreData = debounce(1000, this.loadMoreData);
  };

  componentWillMount = () => {
    ImageService.resetData();
    window.removeEventListener("scroll", this.handleScroll);
  };

  componentDidMount = () => {
    let data = ImageService.getInitialData();
    this.setState({images: data});
    this.setState({searchImages: ImageService.getAllData()});
    this.setState({activeImage: data[0]});
    window.addEventListener("scroll", this.handleScroll);
  };

  //---onScroll methods---
  handleScroll = () => {
    let activeImage = $(".active-image");
    let loadingAnimation = $(".loading__animation");
    let imagesGalleryTop = $(".images-panel")[0].getBoundingClientRect().top;
    let footerTop = $(".footer")[0].getBoundingClientRect().top;

    if(imagesGalleryTop <= 0 && !(activeImage.hasClass("active-image--fixed"))) {
      activeImage.addClass("active-image--fixed");
    }

    if(imagesGalleryTop >= 0 && activeImage.hasClass("active-image--fixed")) {
      activeImage.removeClass("active-image--fixed");
    }

    if (document.body.clientHeight >= footerTop) {
      if (!ImageService.allImagesLoaded()) {
        loadingAnimation.removeClass("loading__animation--hidden");
        this.loadMoreData(loadingAnimation);
      } else {
        $(".loading__message").removeClass("loading__message--hidden");
      }
    }
  };

  loadMoreData = (loadingAnimation) => {
    let data = ImageService.getNextData();
    loadingAnimation.addClass("loading__animation--hidden");
    this.setState({images: data});
    this.setState({searchImages: ImageService.getAllData()});
  };

  //---search methods---
  changeImageBlock = (prop, value) => {
    let searchText = prop['prop'].toLowerCase(),
        searchImages = this.state.searchImages,
        newImageBlock = [],
        newSuggestBlock = [];

    if(!searchText) {
      newImageBlock = searchImages;
    } else {
      for(let i = 0; i < searchImages.length; i++) {
        let arr = searchImages[i]['tags'];
        for(let j = 0; j < arr.length; j++) {
          if( (!value && arr[j].toLowerCase().indexOf(searchText) > -1)
              || (value && arr[j].toLowerCase() === searchText) ) {
            newSuggestBlock.push(arr[j]);
            newImageBlock.push(searchImages[i]);
            j = arr.length;
          }
        }
      }
    }

    this.setState({searchSuggestions: newSuggestBlock.filter((item, pos) => {
      return newSuggestBlock.indexOf(item) === pos;
    })});
    this.setState({images: newImageBlock});

    if(newImageBlock === []){
      this.setState({activeImage: {}});
    } else {
      this.setState({activeImage: newImageBlock[0]});
    }
  };

  //---for ModalWindow---
  handleOpenModal = () => {
    $("html,body").addClass("scroll--locked");
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
    $("html,body").removeClass("scroll--locked");
  };

  onAddNewImage = () => {
    this.componentDidMount();
    this.handleOpenModal();
  };

  render() {
    return (
      <div onScroll={this.handleScroll}>  {/*main-content*/}
        <SearchInput searchSuggestions={this.state.searchSuggestions}
                     onSearchTextChange={(prop, value) => this.changeImageBlock({prop}, value)}/>
        <div className="gallery-panel d-flex">
          <div className="images-panel flex-column">
            <div>
              <ImageBlock images={this.state.images}
                          selectImage={activeImage => this.setState({activeImage})}/>
            </div>
          </div>
          <div className="active-image flex-column">
            <button type="button"
                    className="btn btn-primary btn-block"
                    onClick={this.onAddNewImage}>
              Upload image
            </button>
            <div className="info">
              <ActiveImage activeImage={this.state.activeImage}/>
            </div>
          </div>
        </div> {/*gallery-panel*/}

        <div className="loading">
          <div className="loading__message loading__message--hidden d-flex justify-content-center">
            All images loaded
          </div>
          <div className="loading__animation loading__animation--hidden">
            <div className="bounce1" />
            <div className="bounce2" />
            <div className="bounce3" />
          </div>
        </div>

        <ReactModal isOpen={this.state.showModal}
                    onRequestClose={this.handleCloseModal}
                    className="Modal"
                    overlayClassName="Overlay">
          <AddImagePanel closeModal={this.handleCloseModal}
                         images={this.state.images}/>
        </ReactModal>
      </div>
    );
  }
}

export default withRouter(Gallery);