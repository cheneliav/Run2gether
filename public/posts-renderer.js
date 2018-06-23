/**
 * @class Responsible for rendering posts in the HTML
 */

class PostsRenderer {
  constructor() {
    this.$posts = $(".posts");
    this.$postTemplate = $('#post-template').html();
  }

  renderPosts(posts) {
    console.log('in renderPosts');
    console.log(posts);
    this.$posts.empty();
    console.log(posts.length);
    let template = Handlebars.compile(this.$postTemplate);
    if (posts.length == 0) {
      this.$posts.append('<h1>No match!</h1>');
    } else {
      for (let i = 0; i < posts.length; i++) {
        let newHTML = template(posts[i]);
        this.$posts.append(newHTML);
      }
    }
  }

}

export default PostsRenderer