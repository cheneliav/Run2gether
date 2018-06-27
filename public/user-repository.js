/**
 * @class Responsible for storing and manipulating Run2gether users and posts, in-memory
 */
class UserRepository {
  constructor() {
    this.users = [];
    this.posts = [];
    this.partners = [];
  }


  addUser(userName, password, phone) {
    console.log('in AddUser:');
    $.ajax({
      method: 'POST',
      url: '/users',
      data: { userName: userName, password: password, phone: phone, posts: [] },
      success: (newUser) => {
        // adding the user to users array
        this.users.push(newUser);
        // console.log('users array after new user signup:');
        //console.log(this.users);

        // show success sign up message
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
        //console.log(response);

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
        //console.log(response);

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
    //console.log('in search');

    let params = {
      city: searchCity,
      distance: searchDistance,
      training: searchTraining
    };
    let query = $.param(params);
    //console.log(query);

    return $.ajax({
      method: 'GET',
      url: '/posts?' + query,
      dataType: 'json',
      success: (posts) => {

        let user = JSON.parse(localStorage.getItem('user'));
        let userIdLocal = user.id;
        this.posts = [];
        //in order to show to the user only other posts , not include his posts
        posts.forEach(post => {
          if (post.idUser !== userIdLocal) {
            this.posts.push(post);
          }
        });

        // add the posts result to array
        // this.posts = posts;
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
        //console.log("The post after adding to the logged user :");
        //console.log(post);
        // $('#addedPost').html("greattttttt!");
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
        //console.log("The user:");
        //console.log(res);

      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(textStatus);
      }
    });


  }

  getPartners() {
    // console.log('in getPartners');

    let user = JSON.parse(localStorage.getItem('user'));
    let userIdLocal = user.id;

    return $.ajax({
      method: 'GET',
      url: '/users/' + userIdLocal,
      success: (partners) => {
        //console.log('partners array:');
        this.partners = partners;
        // console.log(this.partners);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(textStatus);
      }
    });
  }


}

export default UserRepository
