const {SchoolEmployee} = require('./../../models')

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
                ]
            })
            return res.status(200).send(data)
        } catch (error) {
            return res.status(500).send(error)
        }
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
    
            return res.status(200).send(schoolEmployee)   
        } catch (error) {
            return res.status(500).send(error)
        }
    }
}