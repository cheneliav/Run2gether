
import PostsRepository from './posts-repository.js';
import PostsRenderer from './posts-renderer.js';
import EventsHandler from './event-handler.js';
import UserRepository from './user-repository.js';

let postsRepository = new PostsRepository();
let userRepository = new UserRepository();
let postsRenderer = new PostsRenderer();

let eventsHandler = new EventsHandler(postsRepository, postsRenderer, userRepository);

console.log('im in main');

eventsHandler.registerAddUser();

