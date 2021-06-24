const {Permission, ModelHasPermission, School, SchoolEmployee} = require('./../../models')
const {District} = require('./../../models')
const Sequelize = require('sequelize')

module.exports = {
    async index (req, res) {
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
    async store (req, res) {
        try {
            const data = new Permission({
                name : req.body.name
            })
            await data.save()
            return res.status(201).send(data)
        } catch (error) {
            return res.status(500).send(error)
        }
    },
    async destroy (req, res) {
        try {
            const data = await Permission.findOne({
                where: {
                    id : req.params.id
                },
                attributes: { 
                    include: [[Sequelize.fn("COUNT", Sequelize.col("ModelHasPermissions.id")), "count"]] 
                },
                include: [{
                    model: ModelHasPermission, attributes: []
                }]
            })
    
            if (data.id === null) {
                return res.status(400).send({message : 'data tidak ditemukan'})
            }
    
            if (data.getDataValue('count') != 0) {
                return res.status(400).send({message : 'gagal delete, permission digunakan'})
            }
    
            await data.destroy();
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