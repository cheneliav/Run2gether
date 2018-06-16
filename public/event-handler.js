
class EventsHandler {
    constructor(postsRepository, postsRenderer, userRepository) {
        this.userRepository = userRepository;
        this.postsRepository = postsRepository;
        this.postsRenderer = postsRenderer;
        this.$posts = $(".posts");
        console.log('in constructor user');

    }

    /*=====================================================
    add User
    =======================================================*/

    registerAddUser() {
        $('.signup').on('click', (event) => {

            // event.preventDefault();

            console.log('in registerAddUser event:');

            let userName = $("#userName").val();
            let password = $("#pswd").val();
            let repeatPassword = $("#repeatPswd").val();

            if (userName == "" || password == "" || repeatPassword == "") {
                return;
            }

            event.preventDefault();

            // check if the passwords are the same
            // check this here or in the ajax or server ?
            if (password !== repeatPassword) {
                alert("passwords are not the same");
            }

            else
            //TODO :
            //check if user name is already exist in db !!!
            {
                let userObj = { userName, password };

                this.userRepository.addUser(userName, password).then(() => {
                    // this.postsRenderer.renderPosts(this.postsRepository.posts);
                    // $input.val("");

                }).catch(() => { console.log('catch- error in adding user function'); });
            }

        });
    }

    // registerRemovePost() {
    //     this.$posts.on('click', '.remove-post', (event) => {
    //         console.log('in registerRemovePost event:');

    //         let index = $(event.currentTarget).closest('.post').index();
    //         let id = $(event.currentTarget).closest('.post').data('id');
    //         this.postsRepository.removePost(index, id).then(() => {
    //             // remove the post from page
    //             let $post = $(event.currentTarget).closest('.post');
    //             $post.remove();
    //         });
    //     });

    // }







}

export default EventsHandler