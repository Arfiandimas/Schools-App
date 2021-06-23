const {Permission, Sequelize} = require('./../../models')
const {ModelHasPermission} = require('./../../models')
const {School} = require('./../../models')
const {SchoolEmployee} = require('./../../models')

module.exports = {
    async getPermission (req, res) {
        try {
            const data = await Permission.findAll({
                order: [
                    ['createdAt', 'DESC']
                ]
            })
            return res.status(200).send(data)
        } catch (error) {
            return res.status(500).send(error)
        }
    },
    async getSchoolFromPermission (req, res) {
        const data = await Permission.findAll({
            order: [
                ['createdAt', 'DESC']
            ],
            include: [{ 
                model:ModelHasPermission, 
                include: [{model:School}], 
                where: {modelType : 'School'}
            }],
        })
        return res.status(200).send(data)
    },
    async getSchoolEmployeeFromPermission (req, res) {
        const data = await Permission.findAll({
            order: [
                ['createdAt', 'DESC']
            ],
            include: [{ 
                model:ModelHasPermission, 
                include: [{model:SchoolEmployee}], 
                where: {modelType : 'SchoolEmployee'}
            }],
        })
        return res.status(200).send(data)
    }
}