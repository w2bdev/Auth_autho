import express from 'express';

import { getGames, getGame, postGame, deleteGame } from './service';

const app = express();
const router = express.Router();

// API routes
router.route('/games')
    // create a game
    .post(postGame)
    // get all the games
    .get(getGames);
router.route('/games/:id')
    // get a single game
    .get(getGame)
    // delete a single game
    .delete(deleteGame);



module.exports = {
    router: router
}