import React, { Component } from 'react';
import './add-image.css';

class AddImagePanel extends React.Component {
  constructor(props) {
    super(props);
    const name = props.name;
    const src = props.src;
    const tags = props.tags;
    const descr = props.descr;
    this.state = {name: name, src: src, tags: tags, descr: descr};

    this.onNameChange = this.onNameChange.bind(this);
    this.onSrcChange = this.onSrcChange.bind(this);
    this.onTagsChange = this.onTagsChange.bind(this);
    this.onDescrChange = this.onDescrChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onNameChange(e) {
    this.setState({username: e.target.value});
  }

  onSrcChange(e) {
    this.setState({email: e.target.value});
  }

  onTagsChange(e) {
    this.setState({pass: e.target.value});
  }

  onDescrChange(e) {
    this.setState({confirmedPass: e.target.value});
  }

  handleSubmit(event) {
    alert('Image name: ' + this.state.name + ' \nSource: ' + this.state.src
      + ' \nTags: ' + this.state.tags + ' \nDesription: ' + this.state.descr);
    event.preventDefault();
  }

  render() {
    return (
      <form className="formAddImgPanel d-flex " onSubmit={this.handleSubmit}>
        <section className="imgSrc flex-column">
          <h2 className="titlePanel">Add image</h2>
          <div className="imgPanel">
            <div className="dragAndDropPanel d-flex align-items-center">
              <p className="panelTitle" >
                Drag in your images
                <p className="panelDescr">
                  Find media on your hard drive and then drag them in to automatically upload
                </p>
              </p>
            </div>
            <button type="submit" className="btn btn-secondary btnBrowseImg">
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
            <div className="tagsPanel"></div>
            <span className="d-flex flex-row rowTag">
              <input type="text" className="form-control" placeholder="Write a tag..."
                     value={this.state.value} onChange={this.onTagsChange} />
              <button type="button" className="btn btn-secondary btnAddTag">Add tag</button>
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