import React, { Component } from "react";
import "./gallery.css";
import {withRouter} from "react-router-dom";
import $ from "jquery";
import {debounce} from "throttle-debounce";
import ImageBlock from "./image-block";
import ActiveImage from "./active-image";
import SearchInput from "./search-input";
import ReactModal from "react-modal";
import AddImagePanel from "./add-image";
import ImageService from "../service/image-service";

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      searchImages: [],
      searchSuggestions: [],
      activeImage: {},
      showModal: false, //for ModalWindow
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.loadMoreData = debounce(1000, this.loadMoreData);
  };

  componentWillMount() {
    ImageService.resetData();
    window.removeEventListener("scroll", this.handleScroll);
  };

  componentDidMount() {
    let data = ImageService.getInitialData();
    this.setState({images: data});
    this.setState({searchImages: ImageService.getAllData()});
    this.setState({activeImage: data[0]});
    window.addEventListener("scroll", this.handleScroll);
  };

  handleScroll() {
    let activeImageInfo = $(".controls-info");
    let loadingAnimation = $(".spinner");
    let imagesGalleryTop = $(".images-panel")[0].getBoundingClientRect().top;
    let footerTop = $(".footer")[0].getBoundingClientRect().top;

    if(imagesGalleryTop <= 0 && !(activeImageInfo.hasClass("sticky"))) {
      activeImageInfo.addClass("sticky");
    }

    if(imagesGalleryTop >= 0 && activeImageInfo.hasClass("sticky")) {
      activeImageInfo.removeClass("sticky");
    }

    if (document.body.clientHeight >= footerTop) {
      if (!ImageService.allImagesLoaded()) {
        loadingAnimation.removeClass("hidden-elem");    // => visible
        this.loadMoreData(loadingAnimation);
      } else {
        $(".end-of-gallery").removeClass("hidden-elem");  // => visible
      }
    }
  };

  loadMoreData = (loadingAnimation) => {
    let data = ImageService.getNextData();
    loadingAnimation.addClass("hidden-elem");  // => not visible
    this.setState({images: data});
    this.setState({searchImages: ImageService.getAllData()});
  };

  //---search methods---
  changeImageBlock(prop) {
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
          if (arr[j].toLowerCase().indexOf(searchText) > -1) {
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

  changeImageBlock2(prop) {
    let searchText = prop['prop'].toLowerCase(),
      searchImages = this.state.searchImages,
      newImageBlock = [],
      newSuggestBlock = [];

    if(!searchText) {
      newImageBlock = searchImages;
    } else {
      for (let i = 0; i < searchImages.length; i++) {
        let arr = searchImages[i]['tags'];
        for (let j = 0; j < arr.length; j++) {
          if (arr[j].toLowerCase() === searchText) {
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
  handleOpenModal () {
    $("html,body").addClass("block-scroll");
    this.setState({ showModal: true });
  };

  handleCloseModal () {
    this.setState({ showModal: false });
    $("html,body").removeClass("block-scroll");
  };

  onAddImage = () => {
    this.componentDidMount();
    this.handleOpenModal();
  };

  render() {
    return (
      <div className="scrollDiv" onScroll={this.handleScroll}>  {/*gallery*/}
        <SearchInput searchSuggestions={this.state.searchSuggestions}
                     onSearchTextChange={prop => this.changeImageBlock({prop})}
                     onSearchTextChange2={prop => this.changeImageBlock2({prop})}/>
        <div className="gallery-panel d-flex">
          <div className="images-panel flex-column">
            <div>
              <ImageBlock images={this.state.images}
                          selectImage={activeImage => this.setState({activeImage})} />
            </div>
          </div>
          <div className="controls-info  flex-column ">
            <button type="button"
                    className="btn btn-primary btn-block btn-addImage"
                    onClick={this.onAddImage}>
              Upload image
            </button>
            <div className="info-panel">
              <ActiveImage activeImage={this.state.activeImage}/>
            </div>
          </div>
        </div> {/*gallery-panel*/}

        <div className="loading">
          <div className="end-of-gallery d-flex justify-content-center hidden-elem">
            All images loaded
          </div>
          <div className="spinner hidden-elem">
            <div className="bounce1" />
            <div className="bounce2" />
            <div className="bounce3" />
          </div>
        </div>

        <ReactModal isOpen={this.state.showModal}
                    onRequestClose={this.handleCloseModal}
                    className="Modal"
                    overlayClassName="Overlay">
          <AddImagePanel func={this.handleCloseModal} images={this.state.images}/>
        </ReactModal>
      </div>
    );
  }
}

export default withRouter(Gallery);