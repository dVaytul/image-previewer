import React, { Component } from "react";
import "./signup.css";
import {Link, withRouter} from "react-router-dom";
import AuthService from "../service/AuthService";

import Formsy from "formsy-react";
//import MyInput from "../common/MyInput";

import { FRC} from 'formsy-react-components';
const { Input, File } = FRC;
const MyForm = React.createClass({

 mixins: [FRC.ParentContextMixin],

  propTypes: {
   children: React.PropTypes.node
  },

  render() {
    return (
      <Formsy.Form
        className={this.getLayoutClassName()}
        {...this.props}
        ref="formsy"
      >
        {this.props.children}
      </Formsy.Form>
    );
  }

});




class SignUp extends Component {
  constructor(props) {
    super(props);

    // Default state
    this.state = {
      layout: 'horizontal',
      validatePristine: false,
      disabled: false
    };




    const username = props.username;
    const email = props.email;
    const pass = props.pass;
    const confirmedPass = props.confirmedPass;
    this.state = {username: username, email: email, pass: pass,
                  confirmedPass: confirmedPass
    };

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPassChange = this.onPassChange.bind(this);
    this.onConfirmedPassChange = this.onConfirmedPassChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onUsernameChange(e) {
    this.setState({username: e.target.value});
  }

  onEmailChange(e) {
    this.setState({email: e.target.value});
  }

  onPassChange(e) {
    this.setState({pass: e.target.value});
  }

  onConfirmedPassChange(e) {
    this.setState({confirmedPass: e.target.value});
  }

  handleSubmit(event) {
    alert('Username: ' + this.state.username + '\nEmail: ' + this.state.email
          + '\nPass: ' + this.state.pass + '\nConfirmed Pass: ' + this.state.confirmedPass);
    event.preventDefault();
    AuthService.logIn();
    this.props.history.push("/");
  }




  resetForm = () => {
    // This is nasty
    const formsy = this.refs.myform.refs.formsy;
    formsy.reset();
  }

  submitForm = (data) => {
    console.log(data);
  }

  changeOption = (name, value) => {
    var newState = {};
    newState[name] = value;
    this.setState(newState);
  }



  render() {

    var radioOptions = [
      {value: 'a', label: 'Option A'},
      {value: 'b', label: 'Option B'},
      {value: 'c', label: 'Option C'}
    ];

    var radioOptionsDisabled = [
      {value: 'a', label: 'Option A'},
      {value: 'b', label: 'Option B', disabled: true},
      {value: 'c', label: 'Option C'}
    ];

    var optionY = {
      value: 'y',
      label: 'Option Y (yellow css class)',
      className: 'yellow'
    };
    optionY['data-note'] = 'This is a data attribute.';
    var selectOptions = [
      {value: 'a', label: 'Option A'},
      {value: 'a', label: 'Option A (again)'},
      {value: 'b', label: 'Option B'},
      {value: 'c', label: 'Option C', title: 'This is a title attribute for Option C'},
      {value: 'd', label: 'Option D', disabled: true},
      optionY
    ];

    var singleSelectOptions = selectOptions.slice(0);
    singleSelectOptions.unshift({value: '', label: 'Please select…'});


    return (
      <div>

        <form className="formSignInUp container" onSubmit={this.handleSubmit}>
          <h2 className="formTitle">Sign up</h2>
          <p>
            <input type="text" className="form-control" placeholder="Username"
                   value={this.state.value} onChange={this.onUsernameChange}/>
          </p>
          <p>
            <input type="email" className="form-control" placeholder="Email"
                   value={this.state.value} onChange={this.onEmailChange} />
          </p>
          <p>
            <input type="password" className="form-control" placeholder="Password"
                   value={this.state.value} onChange={this.onPassChange} />
          </p>
          <p>
            <input type="password" className="form-control" placeholder="Confirm password"
                   value={this.state.value} onChange={this.onConfirmedPassChange} />
          </p>
          <button type="submit" className="btn btn-primary btn-block">Sign up</button>

          <hr />
          <p className="linkNewAcc">
            <Link to="/signin">
              Already have an account? Sign in here
            </Link>
          </p>
        </form>

        <div>
          <MyForm
            onSubmit={this.submitForm}
            layout={this.state.layout}
            validatePristine={this.state.validatePristine}
            disabled={this.state.disabled}
            ref="myform"
          >
            <fieldset>
              <legend>Input types</legend>
              <Input
                name="secret"
                value="I'm hidden!"
                type="hidden"
              />
              <Input
                name="text1"
                id="artisanCraftedBespokeId"
                value=""
                label="Text"
                type="text"
                placeholder="Here is a text input."
                help="This is a required text input."
                required
              />
              <Input
                name="date[0]"
                value=""
                label="Date"
                type="date"
                placeholder="This is a date input."
                required
              />
              <Input
                name="email"
                value=""
                label="Email"
                type="email"
                autoComplete="off"
                placeholder="This is an email input."
                help="This email field should not autocomplete."
                validations="isEmail"
                validationErrors={{
                  isEmail: 'This doesn’t look like a valid email address.'
                }}
                required
              />
              <Input
                name="password1"
                value=""
                label="Password"
                type="password"
                validations="minLength:8"
                validationError="Your password must be at least 8 characters long."
                placeholder="Choose a password"
              />
              <Input
                name="password2"
                value=""
                label="Confirm password"
                type="password"
                validations="equalsField:password1"
                validationErrors={{
                  equalsField: 'Passwords must match.'
                }}
                placeholder="Retype password"
              />
              <Input
                type="color"
                name="colour1"
                label="Colour input"
                value="#000000"
                validations="equals:#000000"
                validationError="You can have any color, as long as it's black."
              />
              <Input
                type="range"
                name="range1"
                label="Range input"
                min={0}
                max={10}
                step={2}
              />
              <File
                name="file1"
                label="File picker"
                help="Warning: this returns a FileList that will need custom coding to be useful."
                multiple
              />
            </fieldset>

          </MyForm>
        </div>
      </div>
    );
  }
}

export default withRouter(SignUp);