
import PostsRenderer from './posts-renderer.js';
import EventsHandler from './event-handler.js';
import UserRepository from './user-repository.js';

let userRepository = new UserRepository();
let postsRenderer = new PostsRenderer();

let eventsHandler = new EventsHandler(postsRenderer, userRepository);

console.log('im in main');

// get all the users
// in order to check if user already exist in db
userRepository.getUsers();

console.log('users array');
console.log( userRepository.users);




eventsHandler.registerAddUser();
eventsHandler.registerAddPost();

