/**
 * @class Responsible for rendering posts in the HTML
 */

class MessageRenderer {
  constructor() {
    this.$list = $(".list-message");
    this.$listTemplate = $('#list-template').html();
  }

  renderMessages(messages) {
    console.log('in renderPosts');
    console.log(messages);
    this.$list.empty();
    // console.log(posts.length);
    let template = Handlebars.compile(this.$listTemplate);
      for (let i = 0; i < messages.length; i++) {
        let newHTML = template(messages[i]);
        this.$list.append(newHTML);
      }

  }

}

export default MessageRenderer