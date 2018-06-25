/**
 * @class Responsible for rendering posts in the HTML
 */

class MessageRenderer {
  constructor() {
    this.$list = $(".list-message");
    this.$listTemplate = $('#list-template').html();
  }

  renderMessages(messages) {
    console.log('in render messages');
    console.log(messages);
    this.$list.empty();
    // console.log(posts.length);
    let template = Handlebars.compile(this.$listTemplate);
    this.$list.append('<tr><th>User name</th><th>Phone</th></tr>');
      for (let i = 0; i < messages.length; i++) {
        let newHTML = template(messages[i]);
        console.log(newHTML);
        this.$list.append(newHTML);
      }

  }

}

export default MessageRenderer