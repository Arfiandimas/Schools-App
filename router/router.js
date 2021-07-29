// const passport = require('passport') passport.authenticate("jwt", {session: false}),
const Router = require('express-group-router');

//Controller
//Auth
const AuthBracketBrickController = require('../controllers/AuthBracketBrickController')
const AuthSchoolController = require('../controllers/AuthSchoolController')
const AuthSchoolEmployeeController = require('../controllers/AuthSchoolEmployeeController')
//BracketBrick
const BracketbrickSchoolController = require('./../controllers/bracketbrick/SchoolController')
const BracketbrickPermissionController = require('./../controllers/bracketbrick/PermissionController')
//School
const SchoolEmployeeController = require('./../controllers/school/EmployeeController')
const SchoolHistoryAttendanceController = require('./../controllers/school/HistoryAttendanceController')
//School Employee
const SchoolEmployeeProfileController = require('./../controllers/schoolemployee/ProfileController')

//Middleware
const Middleware = require('../middleware/Authentication')
const Scope = require('./../middleware/Scope')
const PermissionMiddleware = require('./../middleware/Permission')

//Request Validation
const BracketbrickRequest = require('./../requests/BracketbrickRequest')
const PermissionRequest = require('./../requests/PermissionRequest')
const SchoolEmployeeRequest = require('./../requests/SchoolEmployeeRequest')
const LoginRequest = require('./../requests/LoginRequest')
const SchoolRequest = require('./../requests/SchoolRequest')

const router = new Router();

const {School} = require('../models')
const {SchoolEmployee} = require('../models')
const {Student} = require('../models')
const {Permission} = require('../models')
const {ModelHasPermission} = require('../models')

//Authentication JWT
router.post('/bracketbrick/register', BracketbrickRequest.register, AuthBracketBrickController.register);
router.post('/bracketbrick/login', LoginRequest.email, AuthBracketBrickController.login);
router.post('/school/register', SchoolRequest.register, AuthSchoolController.register);
router.post('/school/login', LoginRequest.email, AuthSchoolController.login);
router.post('/school_employee/login', LoginRequest.email, AuthSchoolEmployeeController.login);

//Bracket Brick
router.group('/bracketbrick', (router) => {
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
        router.get('/', BracketbrickSchoolController.index);
        router.get('/:id/show', BracketbrickSchoolController.show);
        router.post('/store', SchoolRequest.register, BracketbrickSchoolController.store);
        router.post('/:id/give_permission', PermissionRequest.givePermission, BracketbrickSchoolController.givePermission);
    })
})

//School
router.group('/school', (router) => {
    router.group('/employee', (router) => {
        router.use(Middleware.auth);
        router.use(Scope.schoolScope);
        router.get('/', SchoolEmployeeController.index);
        router.get('/:id/show', SchoolEmployeeController.show);
        router.post('/store', SchoolEmployeeRequest.store, SchoolEmployeeController.store);
        router.post('/:id/give_permission', PermissionRequest.givePermission, SchoolEmployeeController.givePermission);
    })

    router.group('/history_attendance', (router) => {
        router.use(Middleware.auth);
        router.use(Scope.schoolScope);
        router.use(PermissionMiddleware.attendance);
        router.get('/', SchoolHistoryAttendanceController.index);
    })
})

//School Employee
router.group('/school_employee', (router) => {
    router.use(Middleware.auth);
    router.use(Scope.schoolEmployeeScope);

    router.group('/profile', (router) => {
        router.get('/', SchoolEmployeeProfileController.index);
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