
import PostsRenderer from './posts-renderer.js';
import EventsHandler from './event-handler.js';
import UserRepository from './user-repository.js';

let userRepository = new UserRepository();
let postsRenderer = new PostsRenderer();

let eventsHandler = new EventsHandler(postsRenderer, userRepository);

console.log('im in main');

// get all the users
<<<<<<< HEAD
// in order to check if user already exist in db
userRepository.getUsers();

console.log('users array');
console.log( userRepository.users);




eventsHandler.registerAddUser();
=======
// in order to check if user exist or not in db
userRepository.getUsers();

eventsHandler.registerAddUser();
eventsHandler.registerLogIn();

// let userObj=JSON.parse(localStorage.getItem('user'));
// $('.helloUser').text(`Hello ${userObj.userName}`);

eventsHandler.registerLoggedOut();
>>>>>>> 1523a64ef72d6653bd7bbb9d8a59d3e2728e560c
eventsHandler.registerAddPost();

