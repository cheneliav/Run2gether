
class EventsHandler {
    constructor(postsRenderer, userRepository, messagesRenderer) {
        this.userRepository = userRepository;
        this.postsRenderer = postsRenderer;
        this.messagesRenderer = messagesRenderer;
        this.$posts = $(".posts");
        //  console.log('in constructor user');
    }

    /*=====================================================
    add User- sign up
    =======================================================*/

    registerAddUser() {
        $('.signup').on('click', (event) => {
            // console.log('in registerAddUser event:');

            let userName = $("#userName").val();
            let password = $("#pswd").val();
            let phone = $("#phone").val();
            let repeatPassword = $("#repeatPswd").val();

            if (userName == "" || password == "" || repeatPassword == "" || phone == "")
                return;

            this.userRepository.SignUp().catch(() => { console.log('catch- error in adding user function'); });

            event.preventDefault();
        });
    }


    registerLogIn() {
        $('.login').on('click', (event) => {
            // console.log('in login ');

            let userName = $("#name").val();
            let password = $("#pswdLogIn").val();

            if (userName == "" || password == "")
                return;

            this.userRepository.Login();

            event.preventDefault();
        });
    }


    registerAddPost() {
        $('#post').on('click', (e) => {
            // e.preventDefault();
            if ($('#time').val() == "")
                return;
            if ($('#myDistance :selected').val() == "")
                return;
            if ($('#myType :selected').val() == "")
                return;

            let gender = $('input[name=gender]:checked').val();
            let address = $('#address').val();
            let city = $('#city').val();
            let depTime = $('#time').val();
            let distance = $('#myDistance :selected').text();
            let training = $('#myType :selected').text();
            let lat = $('#lat').val();
            let lng = $('#lng').val();

            this.userRepository.addPost(gender, address, city, depTime, distance, training, lat, lng);

            e.preventDefault();
        })
    }


    registerLoggedOut() {
        $('#loggedOut').on('click', () => {
            // remove the user from the local storage
            localStorage.removeItem('user');
            //console.log('remove from local storgae');
        })
    }


    registerSearch() {
        $('.searchBtn').on('click', (event) => {
            event.preventDefault();

            let searchCity = $(".search-city").val();

            let searchDistance = "";
            if ($(".search-distance :selected").val() != "") {
                searchDistance = $(".search-distance :selected").text();
            }

            let searchTraining = "";
            if ($(".search-training :selected").val() != "") {
                searchTraining = $(".search-training :selected").text();
            }

            this.userRepository.searchPosts(searchCity, searchDistance, searchTraining).then(() => {
                this.postsRenderer.renderPosts(this.userRepository.posts);
                $(".search-city").val("");
                $(".search-address").val("");

            });
        });
    }

    registerJoinMe() {
        $('.posts').on('click', '.contact', (event) => {
            // console.log('in registerJoinMe');

            let userIdPost = $(event.currentTarget).closest('.post').data('id');
            let userName = JSON.parse(localStorage.getItem('user')).userName;
            let phone = JSON.parse(localStorage.getItem('user')).phone;

            this.userRepository.joinMe(userIdPost, userName, phone).then(() => {
                //disable join after clicked it
                // TODO: after refresh it's back again to the normal--need to fix so it will still be disable
                $(event.currentTarget).addClass('disable-join');

                this.registerGetPartners();
            });

        });
    }

    registerGetPartners() {
        //console.log('in registerGetPartners');

        let user = JSON.parse(localStorage.getItem('user'));
        if (user != null) {
            this.userRepository.getPartners().then(() => {
                //console.log(this.userRepository.partners);

                this.messagesRenderer.renderMessages(this.userRepository.partners);
            })
        }
    }


    registerRemoveFromView() {
        $('.posts').on('click', '.remove-post', function () {
            //remove post from view
            $(this).closest('.post').remove();
        });
    }

    registerRefresh() {
        $('.refresh').on('click', () => {
            this.messagesRenderer.renderMessages(this.userRepository.partners);
        })
    }

}
export default EventsHandler
