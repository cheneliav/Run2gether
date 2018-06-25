/**
 * @class Responsible for storing and manipulating Run2gether users and posts, in-memory
 */
class UserRepository {
  constructor() {
    this.users = [];
    this.posts = [];
    this.partners = [];
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

  addUser(userName, password, phone) {
    console.log('in AddUser:');
    $.ajax({
      method: 'POST',
      url: '/users',
      data: { userName: userName, password: password, phone: phone, posts: [] },
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
            this.addUser(response.name, response.password, response.phone);

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
            localStorage.setItem('user', JSON.stringify({ userName: response.name, id: response.id, phone: response.phone }));

            let user = JSON.parse(localStorage.getItem('user'));

            console.log('user in local storge');
            console.log(user);

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

  searchPosts(searchCity, searchDistance, searchTraining) {

    let params = {
      city: searchCity,
      distance: searchDistance,
      training: searchTraining
    };
    let query = $.param(params);

    // document.write(query);

    console.log('in search');

    console.log(query);
    return $.ajax({
      method: 'GET',
      url: '/posts?' + query,
      dataType: 'json',
      success: (posts) => {

        // add the posts to array
        this.posts = posts;

        console.log("this.posts:");
        console.log(this.posts);

      }
    });
  }


  addPost(gender, address, city, depTime, distance, training, lat, lng) {
    let user = JSON.parse(localStorage.getItem('user'));

    let postObj = {
      gender: gender,
      city: city,
      street: address,
      trainingType: training,
      distance: distance,
      departureTime: depTime,
      idUser: user.id,
      location: { lat: lat, lng: lng }
    };

    $.ajax({
      method: 'post',
      url: '/users/' + user.id + '/posts',
      data: postObj,
      success: (post) => {
        console.log("The post after adding to the logged user :");
        console.log(post);
        $('#addedPost').html("greattttttt!");
        // show success message
        let x = document.getElementById("snackbar2");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);

      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(textStatus);
      }
    });

  }

  joinMe(userIdPost, userName, phone) {

    return $.ajax({
      method: 'post',
      url: '/users/' + userIdPost + '/joinMe',
      data: { name: userName, phoneNum: phone },
      success: (res) => {
        console.log("The user{name, phone}:");
        console.log(res);
        // this.getPartners();
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(textStatus);
      }
    });


  }

  getPartners() {
    console.log('in getPartners');

    let user = JSON.parse(localStorage.getItem('user'));
    if (user != null) {
      let userIdLocal = user.id;

      return $.ajax({
        method: 'GET',
        url: '/users/' + userIdLocal,
        success: (partners) => {
          console.log('partners array ?');
          console.log(partners);
          this.partners = partners;
          console.log(this.partners);

        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(textStatus);
        }
      });
    }
    else return new Promise(function (resolve, b) {
      resolve(1);
    })
  }


}

export default UserRepository
