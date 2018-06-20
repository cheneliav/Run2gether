
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



    registerLogIn() {
        $('.login').on('click', (event) => {
            console.log('in login ');

            let userName = $("#name").val();
            let password = $("#pswdLogIn").val();
            console.log('users array event handler:');
            console.log(this.userRepository.users);

            if (userName == "" || password == "")
                return;

            // event.preventDefault();

            let userArray = this.userRepository.users;
            let isExist = false;
            let pswdFromDB;
            let userId;
            //check if user name exists in db
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
                    $('#nameError').addClass('d-none');
                    $('#pswdLogInError').removeClass('d-none');
                    event.preventDefault();
                    return;
                }

                // user name and password are correct
                else {
                    console.log('pswrd and userName are correct');

                    // save the user details in local storage
                    // store, a JS object as JSON string, in local storage under the key "user"
                    localStorage.setItem('user', JSON.stringify({ userName: userName, _id: userId }));


                    // get our user from local storage and convert it back to a JS Object
                    // let user = JSON.parse(localStorage.getItem('user'))
                    // console.log(user.userName);

                    // // set the user name
                    // console.log('set user name in Hello...');
                    // $('.helloUser').html(`Hello ${user.userName}`);


                    window.location.href = "/postSearch.html";

                    // event.preventDefault();

                }
            }

        });
    }

    registerLoggedOut() {
        $('#showHello').on('click', () => {
            // remove the user from the local storage
            localStorage.removeItem('user');
        })

    }



}


export default EventsHandler




                    /*   $.ajax({
                           method: 'POST',
                           url: '/postSearch.html',
                           data: $('#formlogin').serialize(),
                           success:  (response)=> {
                             let innerHtml=  this.userRepository.getBody(response);
                               $('body').html(innerHtml);
                               // window.location = '/postSearch.html'
                               localStorage.setItem('user', JSON.stringify({ userName: userName, _id: userId }));
                               // set the user name
                               console.log('set user name in Hello...');
                               $('.helloUser').html(`Hello ${userName}`);
                           },
                           error: function (jqXHR, textStatus, errorThrown) {
                               console.log(textStatus);
                           }
                       });
                       // move to postSearch.html page
                       // window.location.href = "/postSearch.html";
                       // history.pushState(null, '', '/postSearch.html');
                       // window.location.replace("/postSearch.html");

                       event.preventDefault();
                       */