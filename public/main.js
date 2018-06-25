import PostsRenderer from './posts-renderer.js';
import MessageRenderer from './message-render.js';
import EventsHandler from './event-handler.js';
import UserRepository from './user-repository.js';

let userRepository = new UserRepository();
let postsRenderer = new PostsRenderer();
let messagesRenderer = new MessageRenderer();

let eventsHandler = new EventsHandler(postsRenderer, userRepository, messagesRenderer);

console.log('im in main');

userRepository.getUsers();
eventsHandler.registerGetPartners();

eventsHandler.registerJoinMe();
eventsHandler.registerAddUser();
eventsHandler.registerLogIn();
eventsHandler.registerLoggedOut();
eventsHandler.registerAddPost();
eventsHandler.registerSearch();

