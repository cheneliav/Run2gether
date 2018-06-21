
class EventsHandler {
    constructor(postsRenderer, userRepository) {
        this.userRepository = userRepository;
        this.postsRenderer = postsRenderer;
        this.$posts = $(".posts");
        console.log('in constructor user');
    }

    /*=====================================================
    add User | sign up
    =======================================================*/



    registerAddUser() {
        $('.signup').on('click', (event) => {
            console.log('in registerAddUser event:');

            let userName = $("#userName").val();
            let password = $("#pswd").val();
            let repeatPassword = $("#repeatPswd").val();

            if (userName == "" || password == "" || repeatPassword == "")
                return;

            // this.userRepository.SignUp().then(() => {
            //     this.userRepository.addUser(userName, password);
            // }).catch(() => { console.log('catch- error in adding user function'); });
            this.userRepository.SignUp().catch(() => { console.log('catch- error in adding user function'); });

            event.preventDefault();
        });
    }


    registerLogIn() {
        $('.login').on('click', (event) => {
            console.log('in login ');

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
            let latitude = $('#lat').val();
            let longitude = $('#lng').val();

            this.userRepository.addPost(gender, address, city, depTime, distance, training);
 /*          this.userRepository.addPost(gender, address, city, depTime, distance, training).then(() => {
                e.preventDefault();
              
                console.log("added !!!!!!!!!!!");
                $('#addedPost').html("greattttttt!");

            }).catch(() => { console.log('catch- error in adding user function'); });
*/
            // console.log("added !!!!!!!!!!!");

            e.preventDefault();
        })
    }


    registerLoggedOut() {
        $('#loggedOut').on('click', () => {
            // remove the user from the local storage
            localStorage.removeItem('user');
            console.log('remove from local storgae');

        })
    }


}


export default EventsHandler

