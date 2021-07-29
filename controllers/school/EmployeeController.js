const { v4: uuidv4 } = require('uuid');
const {SchoolEmployee, ModelHasPermission, Permission} = require('./../../models')

const getSchoolEmployee = async obj => {
    return await SchoolEmployee.findOne({
        where: obj
    })
}

module.exports = {
    async index (req, res) {
        try {
            const data = await SchoolEmployee.findAll({
                order: [
                    ['createdAt', 'DESC']
                ],
                where: {schoolId: req.user.id}
            })
            return res.status(200).send(data)
        } catch (error) {
            return res.status(500).send(error)
        }
    },
    async show (req, res) {
        const data = await SchoolEmployee.findOne({
            where : {id : req.params.id, schoolId: req.user.id},
            include: [{ 
                model:ModelHasPermission, 
                include: [{model:Permission}]
            }]
        })

        return res.status(200).send(data)
    },
    async store (req, res) {
        try {
            const newData = new SchoolEmployee({
                schoolId : req.user.id,
                name : req.body.name,
                email : req.body.email,
                password : req.body.password
            })
            
            const schoolEmployeeExist = await getSchoolEmployee({email : req.body.email})
            if (schoolEmployeeExist) {
                return res.status(422).send({message: "email terdaftar !"})
            }
    
            const schoolEmployee = await newData.save()
    
            return res.status(201).send(schoolEmployee)   
        } catch (error) {
            return res.status(500).send(error)
        }
    },
    async givePermission (req, res) {
        const permissionId = req.body.permissionId
        const schollIdFromEmployee  = await getSchoolEmployee({id:req.params.id})
        const permissionAvailable = await ModelHasPermission.findAll({
            where: {modelId: req.user.id, modelType: 'School'},
            attributes : ['permissionId']
        })

        let permissionExist = []
        permissionAvailable.forEach(element => {
            permissionExist.push(element.permissionId)
        });

        if (req.user.id !== schollIdFromEmployee.schoolId) {
            return res.status(500).send({message : 'employee tidak terdaftar di sekolah ini !'})
        }

        await ModelHasPermission.destroy({
            where: {modelId: req.params.id, modelType: 'SchoolEmployee'},
            force: true
        })

        let newData = []
        permissionId.forEach(element => {
            const checkValue = permissionExist.includes(element)
            if (checkValue === false) {
                return res.status(500).send("school tidak mempunyai salah satu atau lebih permission !")
            }
            const newPermission = ({
                id : uuidv4(),
                modelType : 'SchoolEmployee',
                modelId : req.params.id,
                permissionId : element
            })        
            newData.push(newPermission)
        });

        const newPermissionSchoolEmployee = await ModelHasPermission.bulkCreate(newData, {returning: true})
        
        return res.status(201).send(newPermissionSchoolEmployee)
    }
}