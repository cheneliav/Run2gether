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
    return  $.ajax({
          method: 'GET',
          url: 'users',
          dataType: 'json',
          success: (users)=> {
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

  addPost() {

  }

}

export default UserRepository