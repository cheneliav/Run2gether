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

    this.$posts.empty();
    let template = Handlebars.compile(this.$postTemplate);
    for (let i = 0; i < posts.length; i++) {
      let newHTML = template(posts[i]);
      //   console.log(newHTML);
      this.$posts.append(newHTML);
    }
  }

}

export default PostsRenderer