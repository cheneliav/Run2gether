/**
 * @class Responsible for storing and manipulating Run2gether posts, in-memory
 */
class UserRepository {
  constructor() {
    this.users = [];
  }

  //request all the posts from the DB
  //in the success handler- populate the posts array and then use it to render the view
  getPosts() {
    // return  $.ajax({
    //       method: 'GET',
    //       url: 'posts',
    //       dataType: 'json',
    //       success: (posts)=> {
    //           console.log('in getPosts, posts-array:');
    //           console.log(posts);
    //           // add the posts and the comments to array
    //           this.posts = posts;
    //       },
    //       error: function (jqXHR, textStatus, errorThrown) {
    //           console.log(textStatus);
    //       }
    //   });
  }

  addUser(userName, password) {
    console.log('in AddPost:');

    this.users.push({ userName, password });
    console.log('users array:');

    console.log(this.users);


    // return $.ajax({
    //     method: 'POST',
    //     url: '/posts',
    //     data: { userName, password},
    //     //After a new post has been created in the DB it should be returned to the client
    //     success: (newUser) => {
    //         // adding the user to users array
    //         this.users.push(newUser);
    //     },
    //     error: function (jqXHR, textStatus, errorThrown) {
    //         console.log(textStatus);
    //     }
    // });
  }


}

export default UserRepository