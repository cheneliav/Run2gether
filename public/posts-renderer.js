/**
 * @class Responsible for rendering posts in the HTML
 */

class PostsRenderer {
  constructor() {
    this.$posts = $(".posts");
    this.$postTemplate = $('#post-template').html();
  }

  renderPosts(posts ) {
    console.log('in renderPosts');
    console.log(posts);
    this.$posts.empty();
    console.log(posts.length);
    let template = Handlebars.compile(this.$postTemplate);
    for (let i = 0; i < posts.length; i++) {
      let newHTML = template(posts[i]);
         console.log(newHTML);
      this.$posts.append(newHTML);
      // this.$posts.append('<p>dwsnsa</p>');
    }
  }

}

export default PostsRenderer