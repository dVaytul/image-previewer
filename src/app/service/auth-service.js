const user = {
  name: "Nicolas",
  pass: "Qwerty1",
  email: "cage@email.com",
  loggedIn: false
};

let getCurrentUser = () => {
  return user;
};

let auth = (email, pass) => {
  let promise = new Promise( (resolve, reject) => {
    setTimeout( () => {
      resolve(true);
    }, 1000);
  });
};

let isLoggedIn = () => {     //user === null -> not loggined
  return user.loggedIn;
};

let logOut = () => {
  user.loggedIn = false;
  return user.loggedIn;
};

let logIn = () => {
  user.loggedIn = true;
//  return user.loggedIn;
};

let setNewUser = (name, pass, email) => {
  user.name = name;
  user.pass = pass;
  user.email = email;
};

export default {
  getCurrentUser,
  setNewUser,
  isLoggedIn,
  auth,
  logOut,
  logIn
}