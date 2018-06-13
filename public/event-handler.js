var textPostOrigin = "";

class EventsHandler {
    constructor(postsRepository, postsRenderer) {
        this.postsRepository = postsRepository;
        this.postsRenderer = postsRenderer;
        this.$posts = $(".posts");
    }

    /*=====================================================
    add / remove post
    =======================================================*/
    registerAddPost() {
        $('#addpost').on('click keyup', (event) => {
            console.log('in registerAddPost event:');

            event.preventDefault();
            if (event.keyCode === 13 || event.type === 'click') {
                let $input = $("#postText");
                if ($input.val() === "") {
                    alert("Please enter text!");
                }
                else {
                    this.postsRepository.addPost($input.val()).then(() => {
                        this.postsRenderer.renderPosts(this.postsRepository.posts);
                        $input.val("");
                    }).catch(() => { console.log('catch- error in adding post function'); });
                }
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