
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

            // event.preventDefault();

            console.log('in registerAddUser event:');

            let userName = $("#userName").val();
            let password = $("#pswd").val();
            let repeatPassword = $("#repeatPswd").val();

            if (userName == "" || password == "" || repeatPassword == "")
                return;

            event.preventDefault();

            // check if the passwords are the same
            if (password != repeatPassword) {
                // alert("Passwords are not the same");
                //show the error message
                $('#pswrdNotSameError').removeClass('d-none');
                return;
            }

            else {
                $('#pswrdNotSameError').addClass('d-none');
            }

            //check if user name is already exists in db
            console.log('users array event handler:');
            console.log(this.userRepository.users);
            let userArray = this.userRepository.users;
            let isExist = false;
            for (let i = 0; i < userArray.length; i++) {
                if (userArray[i].userName === userName) {
                    isExist = true;
                    break;
                }
            }
            console.log('user name exist : ' + isExist);

            if (isExist) {
                // alert("This user name is already exists, choose another");
                $('#usernameError').removeClass('d-none');
                return;
            }

            // username and password are valid
            else {
                $('#usernameError').addClass('d-none');
                this.userRepository.addUser(userName, password).catch(() => { console.log('catch- error in adding user function'); });
            }

        });
    }

    registerAddPost() {

        $('#post').on('click', (e) => {

            // e.preventDefault();

            let gender = $('input[name=gender]:checked').val();
            let address = $('#address').val();
            let city = $('#city').val();
            let depTime = $('#time').val();
            let distance = $('#myDistance :selected').text();
            let training = $('#myType :selected').text();

            // dont forget lat and lng

            // get the userId from the local storage!!

            if($('#myDistance :selected').val() !=""){
            let distance = $('#myDistance :selected').text();
            }
            

             this.userRepository.addPost(gender, address, city, depTime, distance, training);
            //  this.userRepository.addPost(gender, address, city, time, distance, training).then(() => {
            // }).catch(() => { console.log('catch- error in adding user function'); });


        })
    }
    registerLogIn() {
        $('.login').on('click', (event) => {
            console.log('in login ');

            let userName = $("#name").val();
            let password = $("#pswdLogIn").val();
            //check if user name exists in db
            console.log('users array event handler:');
            console.log(this.userRepository.users);

            if (userName == "" || password == "")
                return;

            // event.preventDefault();

            let userArray = this.userRepository.users;
            let isExist = false;
            let pswdFromDB;
            let userId;
            for (let i = 0; i < userArray.length; i++) {
                if (userArray[i].userName === userName) {
                    isExist = true;
                    pswdFromDB = userArray[i].password;
                    userId = userArray[i]._id;
                    break;
                }
            }
            console.log(' user name exist : ' + isExist);

            if (!isExist) {
                // alert("This user name is NOT exists in db");
                $('#nameError').removeClass('d-none');
                event.preventDefault();
                return;
            }

            else { // user name exists
                if (password != pswdFromDB) {
                    // alert("Password is wrong!");
                    $('#pswdLogInError').removeClass('d-none');
                    event.preventDefault();
                    return;
                }

                // user name and password are correct
                else {
                    console.log('pswrd and userName are correct');

                    // save the user details in local storage
                    // store, a JS object as JSON string, in local storage under the key "user"
                    // localStorage.setItem('user', JSON.stringify({ userName: userName, password: pswdFromDB, _id: userId }));
                    localStorage.setItem('user', JSON.stringify({ userName: userName, _id: userId }));

                    // set the user name
                    console.log('set user name in Hello...');
                    $('.helloUser').html(`Hello ${userName}`);


                    // move to postSearch.html page
                    // window.location.href = "/postSearch.html";
                    // history.pushState(null, '', '/postSearch.html');
                    // window.location.replace("/postSearch.html");
                    // event.preventDefault();

                }
            }

        });
    }

    registerLoggedOut() {
        // remove the user from the local storage
        localStorage.removeItem('user');
    }

    registerAddPost() {

    }


}

export default EventsHandler