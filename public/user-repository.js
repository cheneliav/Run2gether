/**
 * @class Responsible for storing and manipulating Run2gether users and posts, in-memory
 */
class UserRepository {
  constructor() {
    this.users = [];
  }

  //request all the users from the DB
  //in the success handler- populate the users array
  getUsers() {
    return $.ajax({
      method: 'GET',
      url: 'users',
      dataType: 'json',
      success: (users) => {
        console.log('in getUsers, users-array:');
        console.log(users);
        // set the users and the posts to array
        this.users = users;
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(textStatus);
      }
    });
  }

  addUser(userName, password) {
    console.log('in AddUser:');

    // maybe do here http GET (so in server i will check validation of pswd and username )
    //and in the "then." do a http POST after the pswrd and username are valid

    return $.ajax({
      method: 'POST',
      url: '/users',
      data: { userName: userName, password: password, posts: [] },
      //After a new post has been created in the DB it should be returned to the client
      success: (newUser) => {
        // adding the user to users array
        this.users.push(newUser);

        console.log('users array:');
        console.log(this.users);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(textStatus);
      }
    });
  }

  check() {
    return $.ajax({
      method: 'POST',
      url: '/login',
      data: $('#formlogin').serialize(),
      success: (response) => {
        console.log(response); // "try something"

        switch (response) {
          case "passwordWrong":
            $('#nameError').addClass('d-none');
            $('#pswdLogInError').removeClass('d-none');
            break;
          case "userNotExist":
            $('#nameError').removeClass('d-none');
            break;
          case "allGood":
            return true;
            // store, a JS object as JSON string, in local storage under the key "user"
            // break;
        }


      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(textStatus);
      }
    });

  }

  addPost() {

  }

}

export default UserRepository