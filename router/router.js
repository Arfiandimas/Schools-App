// const passport = require('passport') passport.authenticate("jwt", {session: false}),
const Router = require('express-group-router');

//Controller
//Auth
const AuthBracketBrickController = require('../controllers/AuthBracketBrickController')
const AuthSchoolController = require('../controllers/AuthSchoolController')
//BracketBrick
const BracketbrickSchoolController = require('./../controllers/bracketbrick/SchoolController')
const BracketbrickPermissionController = require('./../controllers/bracketbrick/PermissionController')
//School
const SchoolEmployeeController = require('./../controllers/school/EmployeeController')

//Scope
const Scope = require('./../middleware/Scope')

//Middleware
const Middleware = require('../middleware/Authentication')

//Request Validation
const BracketbrickRequest = require('./../requests/BracketbrickRequest')
const PermissionRequest = require('./../requests/PermissionRequest')

const router = new Router();

const {School} = require('../models')
const {SchoolEmployee} = require('../models')
const {Student} = require('../models')
const {Permission} = require('../models')
const {ModelHasPermission} = require('../models')

//Bracket Brick
router.group('/bracketbrick', (router) => {
    // Auth JWT
    router.post('/register', BracketbrickRequest.register, AuthBracketBrickController.register);
    router.post('/login', AuthBracketBrickController.login);

    router.group('/permission', (router) => {
        router.use(Middleware.auth);
        router.use(Scope.bracketbrickScope);
        router.get('/', BracketbrickPermissionController.index);
        router.post('/store', PermissionRequest.store, BracketbrickPermissionController.store);
        router.delete('/:id/destroy', BracketbrickPermissionController.destroy);
        router.get('/school', BracketbrickPermissionController.getSchoolFromPermission);
        router.get('/school_employee', BracketbrickPermissionController.getSchoolEmployeeFromPermission);
    })

    router.group('/school', (router) => {
        router.use(Middleware.auth);
        router.use(Scope.bracketbrickScope);
        router.get('/', BracketbrickSchoolController.getSchool);
    })
})

//School
router.group('/school', (router) => {
    // Auth JWT
    router.post('/register', AuthSchoolController.register);
    router.post('/login', AuthSchoolController.login);

    router.group('/employee', (router) => {
        router.use(Middleware.auth);
        router.use(Scope.schoolScope);
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