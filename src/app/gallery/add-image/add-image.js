import React, { Component } from "react";
import "./add-image.css";
import Files from "react-files";
import TagBlock from "./tag-block/tag-block";
import ImageService from "../../service/image-service";

class AddImagePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      url: '',
      tagsArr: [],
      descr: '',
      files: [],
      tag: ''
    };
  }

  onNameChange = (e) => {
    this.setState({name: e.target.value});
  };

  onUrlChange = (e) => {
    this.setState({url: e.target.value});
  };

  onTagChange = (e) => {
    this.setState({tag: e.target.value});
  };

  onAddTag = () => {
    if(this.state.tag.trim() !== "") {
      let arr = this.state.tagsArr;
      for(let i = 0; i < arr.length; i++) {
        if(arr[i].toLowerCase() === this.state.tag.toLowerCase()) {
          this.setState({tagsArr: arr, tag: ''});
          return;
        }
      }
      arr.push(this.state.tag);
      this.setState({tagsArr: arr, tag: ''});
    }
  };

  onDescrChange = (e) => {
    this.setState({descr: e.target.value});
  };

  onFilesChange = (files) => {
    this.setState({files: files});
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if(this.state.files.length > 0 && this.state.tagsArr.length > 0) {
      let image = {
        "id": ImageService.getLastId(),
        "title": this.state.name,
        "tags": this.state.tagsArr,
        "url": this.state.files[0].preview.url,
        "descr": this.state.descr
      };
      ImageService.addImageToData(image);
      this.props.images.unshift(image);

      this.props.closeModal();
    } else {
      alert("Add image and fill all fields, please.");
    }
  };

  render() {
    return (
      <form className="add-img-panel" onSubmit={this.handleSubmit}>
        <section className="img-src">
          <h2 className="img-src__title">Add image</h2>
          <div className="drag-n-drop">
            <Files className="drag-n-drop__dropzone d-flex justify-content-center align-items-center"
                   ref="files"
                   onChange={this.onFilesChange}
                   accepts={["image/*"]}
                   multiple={false}
                   clickable={true}>
              {this.state.files.length > 0
                ? <div>
                  {this.state.files.map((file) =>
                    <img className="drag-n-drop__image"
                         src={file.preview.url}
                         alt={file.preview.title}
                         key={file.id}  />
                  )}
                </div>
                : <div className="drag-n-drop__text">
                  Drop image here
                  or
                  click to browse
                </div>
              }
            </Files>
          </div>
        </section>

        <section className="img-info">
          <h2 className="img-info__title">Add info</h2>
          <div className="new-line">
            <label>Name your media</label>
            <input type="text"
                   className="form-control"
                   value={this.state.value}
                   onChange={this.onNameChange}
                   required/>
          </div>
          <div className="new-line">
            <label>Add tags</label>
            <div className="img-info__tags">
              <TagBlock tagsArr={this.state.tagsArr}
                        deleteTag={(index) => {
                          let tags = this.state.tagsArr;
                          tags.splice(index, 1);
                          this.setState({tagsArr: tags});
                        }}/>
            </div>
            <span className="img-info__add-tag d-flex flex-row">
              <input type="text"
                     className="form-control"
                     placeholder="Write a tag..."
                     value={this.state.tag}
                     onChange={this.onTagChange}/>
              <button type="button"
                      onClick={this.onAddTag}
                      className="img-info__add-tag-btn btn btn-outline-secondary">
                Add tag
              </button>
            </span>
          </div>
          <div className="new-line">
            <label>Add description</label>
            <textarea className="img-info__description form-control"
                      value={this.state.value}
                      onChange={this.onDescrChange}
                      required/>
          </div>
          <div className="d-flex justify-content-end">
            <button type="submit"
                    className="img-info__publish-btn btn btn-success">
              Publish
            </button>
          </div>
        </section>
      </form>
    );
  }
}

export default AddImagePanel;