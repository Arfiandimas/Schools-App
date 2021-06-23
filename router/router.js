// const passport = require('passport') passport.authenticate("jwt", {session: false}),
const Router = require('express-group-router');

//Controller
//Auth
const AuthBracketBrickController = require('../controllers/AuthBracketBrickController')
const AuthSchoolController = require('../controllers/AuthSchoolController')
//BracketBrick
const BracketBrickSchoolController = require('./../controllers/bracketbrick/SchoolController')
//School
const SchoolEmployeeController = require('./../controllers/school/EmployeeController')


//Middleware
const Middleware = require('../middleware/Middleware')

//Request Validation
const BracketbrickRequest = require('./../requests/BracketbrickRequest')

const router = new Router();

const {School} = require('../models')
const {SchoolEmployee} = require('../models')
const {Student} = require('../models')
const {Permission} = require('../models')
const {ModelHasPermission} = require('../models')

//Bracket Brick
router.group('/bracketbrick', (router) => {
    router.post('/register', BracketbrickRequest.register, AuthBracketBrickController.register);
    router.post('/login', AuthBracketBrickController.login);
    router.group('/protected', (router) => {
        router.use(Middleware.auth);
        router.get('/', AuthBracketBrickController.protected);
    })

    router.group('/school', (router) => {
        router.use(Middleware.auth);
        router.get('/', BracketBrickSchoolController.getSchool);
    })
})

//School
router.group('/school', (router) => {
    // Auth JWT
    router.post('/register', AuthSchoolController.register);
    router.post('/login', AuthSchoolController.login);

    router.group('/protected', (router) => {
        router.use(Middleware.auth);
        router.get('/', AuthSchoolController.protected);
    })

    router.group('/employee', (router) => {
        router.use(Middleware.auth);
        router.get('/', SchoolEmployeeController.getEmployee);
    })
})

router.get('/cobarelasi', async (req, res) => {
    // const school = await School.findAll({ include: [{model:ModelHasPermission, include: [{model:Permission}]}] })
    // const schoolEmployee = await SchoolEmployee.findAll({ include: ['modelHasPermissions'] })
    // const student = await Student.findOne({ where: {name: 'Barjono'}, include: 'school' })

    const permission = await Permission.findAll({ include: [{model:ModelHasPermission}] })
    // const modelHasPermission = await ModelHasPermission.findOne({ where: {id: 1}, include: 'permission' })

    res.send({permission})
});

let listRoutes = router.init();
module.exports = listRoutes;