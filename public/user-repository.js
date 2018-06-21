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

  addPost(gender, address, city, depTime, distance, training) {
    let user = JSON.parse(localStorage.getItem('user'));


    let postObj = {
      gender: gender,
      city: city,
      street: address,
      trainingType: training,
      distance: distance,
      departureTime: depTime,
      idUser: user._id,
      location: { lat: "12", lng: "123" }
    };

    // find index of user

    // dummy input
    this.users.push({ userName: "batya", password: "123", posts: [] })

    // get our user from local storage and convert it back to a JS Object
    console.log("user locall:");
    console.log(user);

    // return the index of the exist user name in  user array
    // otherwise- return -1
    // var index = this.users.findIndex(function (e) {
    //   // return (user.userName === e.userName)
    //   if (user.userName === e.userName){
    //     break;
    //   }
    // });

    // console.log(index);

    // this.users[index].posts.push(postObj);
    this.users[1].posts.push(postObj);
    console.log(this.users);

  }

}

export default UserRepository