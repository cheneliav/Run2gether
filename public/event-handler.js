
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
   

 
  


}

export default EventsHandler
