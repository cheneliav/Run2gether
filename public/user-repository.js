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
    $.ajax({
      method: 'POST',
      url: '/users',
      data: { userName: userName, password: password, posts: [] },
      //After a new user has been created in the DB it should be returned to the client
      success: (newUser) => {
        // adding the user to users array
        this.users.push(newUser);
        console.log('users array after new user signup:');
        console.log(this.users);

        // show success message
        let x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);

      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(textStatus);
      }
    });
  }


  SignUp() {
    return $.ajax({
      method: 'POST',
      url: '/signup',
      data: $('#formsignup').serialize(),
      success: (response) => {
        console.log(response);

        switch (response) {
          case "userExist":
            $('#usernameError').removeClass('d-none');
            $('#pswrdNotSameError').addClass('d-none');
            break;
          case "passwordWrong":
            $('#pswrdNotSameError').removeClass('d-none');
            $('#usernameError').addClass('d-none');
            break;
          default:
            this.addUser(response.name, response.password);

            break;
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(textStatus);
      }
    });
  }


  Login() {
    return $.ajax({
      method: 'POST',
      url: '/login',
      data: $('#formlogin').serialize(),
      success: (response) => {
        console.log(response);

        switch (response) {
          case "userNotExist":
            $('#nameError').removeClass('d-none');
            $('#pswdLogInError').addClass('d-none');
            break;
          case "passwordWrong":
            $('#nameError').addClass('d-none');
            $('#pswdLogInError').removeClass('d-none');
            break;
          default:
            //store, a JS object as JSON string, in local storage under the key "user"
            localStorage.setItem('user', JSON.stringify({ userName: response.name, id: response.id }));
            //move to next page
            window.location.href = "/postSearch.html";
            break;
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(textStatus);
      }
    });
  }


  addPost(gender, address, city, depTime, distance, training) {
    let postObj = {
      city: city,
      street: address,
      trainingType: training,
      distance: distance,
      departureTime: depTime,
      idUser: "123",
      location: { lat: "12", lng: "123" }
    };

    // find index of user

    // dummy input
    this.users.push({ userName: "batya", password: "123", posts: [] })

    // / return the index of the exist city name in cityWeatherArray
    //  otherwise-(new city post) return -1
    var index = this.users.findIndex(function (e) {
      //  return (data.name === e.name)
    });



    this.users[0].posts.push(postObj);
    console.log(this.users);

  }


}

export default UserRepository
