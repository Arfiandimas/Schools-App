const express = require('express');
const passport = require('passport')
const AuthBracketBrickController = require('../controllers/AuthBracketBrickController')
const BracketbrickRequest = require('./../requests/BracketbrickRequest')

const router = express.Router();


//Bracket Brick
router.post('/bracketbrick/register', BracketbrickRequest.register, AuthBracketBrickController.register);
router.post('/bracketbrick/login', AuthBracketBrickController.login);
router.get('/bracketbrick/protected', passport.authenticate("jwt", {session: false}), AuthBracketBrickController.protected);

module.exports = router;