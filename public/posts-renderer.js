/**
 * @class Responsible for rendering posts in the HTML
 */

class PostsRenderer {
  constructor() {
    this.$posts = $(".posts");
    this.$postTemplate = $('#post-template').html();
  }

  renderPosts(posts) {
   // console.log('in renderPosts');
    //console.log(posts);

    let user = JSON.parse(localStorage.getItem('user'));
    let userIdLocal = user.id;

    this.$posts.empty();
   // console.log(posts.length);
    let template = Handlebars.compile(this.$postTemplate);
    if (posts.length == 0) {
      this.$posts.append('<h2>Sorry,<br> not found result.</h2>');
    } else {
      for (let i = 0; i < posts.length; i++) {
        let newHTML = template(posts[i]);
        this.$posts.append(newHTML);
      }
    }
  }

}

export default PostsRenderer