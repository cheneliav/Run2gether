
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

            else
            //TODO :
            //check if user name is already exist in db !!!
            {
                let userObj = { userName, password };
                this.userRepository.addUser(userName, password).then(() => {
                    // save the user details in local storage- WHERE TO DO THAT ? here or in addUser success ?

                    // move to postSearch.html page
                    window.location.href = "/postSearch.html";
                }).catch(() => { console.log('catch- error in adding user function'); });
            }

        });
    }

    registerAddPost(){

    }

    /*=====================================================
    search
    =======================================================*/

    registerSearch() {
        $('.searchBtn').on('click', (event) => {
            event.preventDefault();

            let searchCity = $(".search-city").val();

            let searchDistance = "";
            if ($(".search-distance :selected").val() != ""){
                 searchDistance = $(".search-distance :selected").text();
            }

            let searchTraining = "";
            if ($(".search-training :selected").val() != ""){
                searchTraining = $(".search-training :selected").text();
           }
           
           this.userRepository.searchPosts(searchCity, searchDistance, searchTraining).then(() => {
             this.postsRenderer.renderPosts(this.userRepository.posts);
        });
        });
    }


    
}
export default EventsHandler