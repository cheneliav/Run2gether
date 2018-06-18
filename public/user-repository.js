/**
 * @class Responsible for storing and manipulating Run2gether posts, in-memory
 */
class UserRepository {
  constructor() {
    this.users = [];
    this.searchResults = [];
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
              // add the users and the posts to array
              this.users = users;
          },
          error: function (jqXHR, textStatus, errorThrown) {
              console.log(textStatus);
          }
      });
  }


  //TODO:
  //  need to set users array to this.users ?
  // where to do that ? with func like above , just with url of users?
  // dont forget to move to another page and save in local storgae only in the LOG IN button success!!!
  // for now i did it in SIGN UP button success .

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

        //TODO :
        // save the user details in local storage

      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(textStatus);
      }
    });
  }

  addPost() {

  }

  searchPosts(searchCity, searchDistance, searchTraining) {
   
    let params = {
      city: searchCity,
      distance: searchDistance,
      training: searchTraining 
  };
  let query = $.param(params);

  // document.write(query);


   console.log(searchCity);
   alert(query);
    return  $.ajax({
      method: 'GET',
      url: '/posts?'+ query,
      dataType: 'json',
      success: (searchResults)=> {

          // add the posts to array
          this.searchResults = searchResults;
      },
      error: function (jqXHR, textStatus, errorThrown) {
          console.log(textStatus);
      }
    });     

  }

}

export default UserRepository