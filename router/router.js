const express = require('express');
const passport = require('passport')

//Controller
const AuthBracketBrickController = require('../controllers/AuthBracketBrickController')
const AuthSchoolController = require('../controllers/AuthSchoolController')

//Middleware

//Request Validation
const BracketbrickRequest = require('./../requests/BracketbrickRequest')
const auth = require('./../middleware/auth');

const router = express.Router();

const {School} = require('../models')
const {SchoolEmployee} = require('../models')
const {Student} = require('../models')
const {Permission} = require('../models')
const {ModelHasPermission} = require('../models')

//Bracket Brick
router.post('/bracketbrick/register', BracketbrickRequest.register, AuthBracketBrickController.register);
router.post('/bracketbrick/login', AuthBracketBrickController.login);
router.get('/bracketbrick/protected', passport.authenticate("jwt", {session: false}), auth, AuthBracketBrickController.protected);

//School
router.post('/school/register', AuthSchoolController.register);
router.post('/school/login', AuthSchoolController.login);
router.get('/school/protected', passport.authenticate("jwt", {session: false}), auth, AuthSchoolController.protected);

router.get('/cobarelasi', async (req, res) => {
    // const school = await School.findAll({ include: [{model:ModelHasPermission, include: [{model:Permission}]}] })
    // const schoolEmployee = await SchoolEmployee.findAll({ include: ['modelHasPermissions'] })
    // const student = await Student.findOne({ where: {name: 'Barjono'}, include: 'school' })

    const permission = await Permission.findAll({ include: [{model:ModelHasPermission}] })
    // const modelHasPermission = await ModelHasPermission.findOne({ where: {id: 1}, include: 'permission' })

    res.send({permission})
});

module.exports = router;