import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Header from "./app/common/header"
import Main from "./app/common/main"
import Footer from "./app/common/footer"

class App extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  };

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  };

  handleScroll() {
    let activeImageInfo = document.querySelector('.controls-info'),
        imagesGallery = document.querySelector('.images-panel'),
        imagesGalleryTop = imagesGallery.getBoundingClientRect().top;

      if ( activeImageInfo.classList.contains('sticky') && imagesGalleryTop >= 0 ) {
        activeImageInfo.className = 'controls-info  flex-column';
      } else {
        if (imagesGalleryTop <= 0) {
          activeImageInfo.className = 'controls-info  flex-column sticky';
        }
      }
  };

  render() {
    return (
      <div className="App" onScroll={this.handleScroll}>
        <div className="gallery">
          <Header/>
          <div className="content">
            <Main/>
          </div>
          <Footer/>
        </div>
      </div>
    );
  }
}

export default App;
