
class EventsHandler {
    // constructor(postsRepository, postsRenderer, userRepository) {
    constructor(postsRenderer, userRepository) {
        this.userRepository = userRepository;
        // this.postsRepository = postsRepository;
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

            //check if user name is already exist in db !!
            console.log('users array event handlr:');

            console.log(this.userRepository.users);
            let userArray = this.userRepository.users;
            let isExist = false;
            for (let i = 0; i < userArray.length; i++) {
                if (userArray[i].userName === userName) {
                    isExist = true;
                    break;
                }
            }

            console.log('ans of user name exist : ' + isExist);

            if (isExist) {
                alert("this user name is already exist, choose another");
            }

            else {
                let userObj = { userName, password };
                this.userRepository.addUser(userName, password).catch(() => { console.log('catch- error in adding user function'); });
            }

        });
    }

    registerLogIn() {
        $('.login').on('click', (event) => {
            console.log('in login ');


            let userName = $("#name").val();
            let password = $("#pswdLogIn").val();
            //check if user name is exist in db !!
            console.log('users array event handlr:');

            console.log(this.userRepository.users);
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

            if (userName == "" || password == "") {
                return;
            }

            event.preventDefault();


            console.log('ans of user name exist : ' + isExist);

            if (!isExist) {
                alert("this user name is NOT exist in db");
            }

            else { // user name exist
                if (password != pswdFromDB) {
                    alert("password is wrong!");
                }

                else { // user name and password are correct

                    // save the user details in local storage
                    // store, a JS object as JSON string, in local storage under the key "user"
                    localStorage.setItem('user', JSON.stringify({ userName: userName, password: pswdFromDB, _id: userId }));

                    // move to postSearch.html page
                    window.location.href = "/postSearch.html";
                }

            }

        });
    }

    registerAddPost() {

    }


}

export default EventsHandler