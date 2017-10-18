import React, { Component } from "react";
import "./add-image.css";

import Files from "react-files";
import TagItem from "./tag-item";
import TagBlock from "./tag-block";

class AddImagePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {name: '', url: '', tagsArr: [], descr: '', files: [], tag: '', deletingTag: ''};

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
    let arr = this.state.tagsArr;
    arr.push(this.state.tag);
    this.setState({tagsArr: arr});
  }

  onDescrChange(e) {
    this.setState({descr: e.target.value});
  }

  onFilesChange(files) {
    this.setState({files: files});
  };

  handleSubmit(event) {
    this.props.images.unshift({"id": this.props.images.length,
      "title": this.state.name,
      "tags": this.state.tagsArr,
      "url": this.state.files[0].preview.url,
      "descr": this.state.descr});

    alert('Image name: ' + this.state.name + ' \nSource: ' + this.state.url
      + ' \nTags: ' + this.state.tagsArr + ' \nDesription: ' + this.state.descr
      + ' \n\nsuccessfully added to your gallery.');

    this.props.func(); //close Modal Window
    event.preventDefault();
  }

  render() {
    return (
      <form className="formAddImgPanel d-flex " onSubmit={this.handleSubmit}>
        <section className="imgSrc flex-column">
          <h2 className="titlePanel">Add image</h2>
          <div className="imgPanel">
            <div className="dragAndDropPanel d-flex justify-content-center align-items-center">

              <Files className=" files-dropzone-gallery"
                     ref="files"
                     onChange={this.onFilesChange}
                     accepts={["image/*"]}
                     multiple={false}
                     clickable={true}
              >
                {this.state.files.length > 0
                  ? <div className='files-gallery'>
                    {this.state.files.map((file) =>
                      <img className='files-gallery-item' src={file.preview.url} key={file.id}  />
                    )}
                    </div>
                   : <div>Drop images here or click to browse </div>
                }
              </Files>

              {/*<p className="panelTitle" >
                Drag in your images
                <p className="panelDescr">
                  Find media on your hard drive and then drag them in to automatically upload
                </p>
              </p>*/}
            </div>
            <button type="button" className="btn btn-outline-secondary btnBrowseImg">
              Browse image manually
            </button>
          </div>
        </section>

        <section className="imgInfo flex-column ">
          <h2 className="titlePanel">Add info</h2>
          <p>
            <label>Name your media</label>
            <input type="text" className="form-control"
                   value={this.state.value} onChange={this.onNameChange} />
          </p>
          <p>
            <label>Add tags</label>
            <div className="tagsPanel">
              <TagBlock tagsArr={this.state.tagsArr} deleteTag={deletingTag => this.setState({deletingTag})}/>
            </div>
            <span className="d-flex flex-row rowTag">
              <input type="text" className="form-control" placeholder="Write a tag..."
                     value={this.state.value} onChange={this.onTagChange} />
              <button type="button" onClick={this.onAddTag} className="btn btn-outline-secondary btnAddTag">Add tag</button>
            </span>
          </p>
          <p>
            <label>Add description</label>
            <textarea type="text" className="form-control textareaDescr"
                   value={this.state.value} onChange={this.onDescrChange} />
          </p>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-success btnPublish">Publish</button>
          </div>
        </section>
      </form>
    );
  }
}

export default AddImagePanel;