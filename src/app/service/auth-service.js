var user = {
  name: "",
  pass: "",
  email: "",
  loggedIn: false,

  getCurrentUser: function(){
    return this.loggedIn;
  },

  isUser: function(email, pass) {
    if(1) {
      return true;
    } else {
      return false;  // такого юзера нету
    }
  },

  setNewUser: function (name, pass, email) {
    if(!this.isUser(email, pass)) {
      this.name = name;
      this.pass = pass;
      this.email = email;
      this.loggedIn = true;
    }
  }
};