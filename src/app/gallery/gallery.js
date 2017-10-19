import React, { Component } from "react";
import "./gallery.css";
import {withRouter} from "react-router-dom";
import DATA from "./DATA.json";
import ImageBlock from "./image-block";
import ActiveImage from "./active-image";
import SearchInput from "./search-input";
import ReactModal from "react-modal";
import AddImagePanel from "./add-image";

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      searchImages: [],
      activeImage: {},

      //---for ModalWindow---
      showModal: false,
    };

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
            <p>No more images...</p>
          </div>

          <div className="controls-info  flex-column">
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

        <ReactModal isOpen={this.state.showModal}
                    onRequestClose={this.handleCloseModal}
                    className="Modal"
                    overlayClassName="Overlay"
        >
          <AddImagePanel func={this.handleCloseModal} images={this.state.images}/>
        </ReactModal>
      </div>
    );
  }
}

export default withRouter(Gallery);