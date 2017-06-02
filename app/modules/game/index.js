import express from 'express';

import { getGames, getGame, postGame, deleteGame } from './service';
import { verifyAuth } from '../user/service';

const app = express();
const router = express.Router();

// API routes
router.route('/games')
    // verifyAuth is the security middleware to check the authentication
    .post(verifyAuth, postGame)
    // create a game
    //.post(postGame)
    // get all the games
    .get(getGames);
router.route('/games/:id')
    // get a single game
    .get(getGame)
    // Again delete requests pass through the security middleware
    .delete(verifyAuth, deleteGame);
    // delete a single game
    //.delete(deleteGame);


module.exports = {
    router: router
}