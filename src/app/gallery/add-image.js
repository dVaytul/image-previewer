import React, { Component } from "react";
import "./add-image.css";
import Files from "react-files";
import TagBlock from "./tag-block";

import ImageService from "../service/image-service";

class AddImagePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {name: '', url: '', tagsArr: [], descr: '', files: [], tag: ''};

    this.onNameChange = this.onNameChange.bind(this);
    this.onUrlChange = this.onUrlChange.bind(this);
    this.onTagChange = this.onTagChange.bind(this);
    this.onDescrChange = this.onDescrChange.bind(this);
    this.onFilesChange = this.onFilesChange.bind(this);
    this.onAddTag = this.onAddTag.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onNameChange(e) {
    this.setState({name: e.target.value});
  }

  onUrlChange(e) {
    this.setState({url: e.target.value});
  }

  onTagChange(e) {
    this.setState({tag: e.target.value});
  }

  onAddTag() {
    if(this.state.tag.trim() !== "") {
      let arr = this.state.tagsArr;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].toLowerCase() === this.state.tag.toLowerCase()) {
          this.setState({tagsArr: arr, tag: ''});
          return;
        }
      }
      arr.push(this.state.tag);
      this.setState({tagsArr: arr, tag: ''});
    }
  }

  onDescrChange(e) {
    this.setState({descr: e.target.value});
  }

  onFilesChange(files) {
    this.setState({files: files});
  };

  handleSubmit(event) {
    event.preventDefault();
    if(this.state.files.length > 0 && this.state.tagsArr.length > 0) {
      let image = {
        "id": this.props.images.length,
        "title": this.state.name,
        "tags": this.state.tagsArr,
        "url": this.state.files[0].preview.url,
        "descr": this.state.descr
      };
      ImageService.addImageToData(image);
      this.props.images.unshift(image);

      this.props.func(); //close Modal Window
    } else {
      alert("Add image and fill all fields, please.");
    }
  }

  render() {
    return (
      <form className="formAddImgPanel" onSubmit={this.handleSubmit}>
        <section className="imgSrc">
          <h2 className="titlePanel">Add image</h2>
          <div className="dragAndDropPanel">

            <Files className="files-dropzone-gallery d-flex justify-content-center align-items-center"
                   ref="files"
                   onChange={this.onFilesChange}
                   accepts={["image/*"]}
                   multiple={false}
                   clickable={true}
            >
              {this.state.files.length > 0
                ? <div className='files-gallery'>
                  {this.state.files.map((file) =>
                    <img className='files-gallery-item ' src={file.preview.url} key={file.id}  />
                  )}
                  </div>
                : <div className="textOnDropPanel">
                  Drop image here
                  or
                  click to browse
                </div>
              }
            </Files>
          </div>
        </section>

        <section className="imgInfo">
          <h2 className="titlePanel">Add info</h2>
          <div className="new-line">
            <label>Name your media</label>
            <input type="text"
                   className="form-control"
                   value={this.state.value}
                   onChange={this.onNameChange}
                   required
            />
          </div>
          <div className="new-line">
            <label>Add tags</label>
            <div className="tagsPanel">
              <TagBlock tagsArr={this.state.tagsArr}
                        deleteTag={(index) => {
                          let tags = this.state.tagsArr;
                          tags.splice(index, 1);
                          this.setState({tagsArr: tags});
                        }}
              />
            </div>
            <span className="d-flex flex-row rowTag">
              <input type="text"
                     className="form-control"
                     placeholder="Write a tag..."
                     value={this.state.tag}
                     onChange={this.onTagChange}
              />
              <button type="button"
                      onClick={this.onAddTag}
                      className="btn btn-outline-secondary btnAddTag">
                Add tag
              </button>
            </span>
          </div>
          <div className="new-line">
            <label>Add description</label>
            <textarea type="text"
                      className="form-control textareaDescr"
                      value={this.state.value}
                      onChange={this.onDescrChange}
                      required
            />
          </div>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-success btnPublish">Publish</button>
          </div>
        </section>
      </form>
    );
  }
}

export default AddImagePanel;