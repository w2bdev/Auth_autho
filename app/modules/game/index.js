import express from 'express';

import { getGames, getGame, postGame, deleteGame } from './service';
import { verifyAuth } from '../user/service';

const app = express();
const router = express.Router();

// API routes
// MiddleWare : VerifyAuth
router.route('/games')
    .get(getGames)
    .post(verifyAuth, postGame);
    
router.route('/games/:id')
    .get(getGame)
    .delete(verifyAuth, deleteGame);

module.exports = {
    router: router
}