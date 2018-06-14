/**
 * @class Responsible for storing and manipulating Spacebook posts, in-memory
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

  addPost(postText) {
      console.log('in AddPost:');

      // return $.ajax({
      //     method: 'POST',
      //     url: '/posts',
      //     data: { text: postText, comments: [] },
      //     //After a new post has been created in the DB it should be returned to the client
      //     success: (newPost) => {
      //         console.log("postText: " + postText);
      //         // adding the post to posts array
      //         this.posts.push(newPost);
      //         // this.posts.unshift(newPost);
      //     },
      //     error: function (jqXHR, textStatus, errorThrown) {
      //         console.log(textStatus);
      //     }
      // });
  }


}

export default UserRepository