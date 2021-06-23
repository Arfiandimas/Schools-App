const {School} = require('./../../models')

module.exports = {
    async getSchool (req, res) {
        try {
            const data = await School.findAll()
            return res.status(200).send(data)   
        } catch (error) {
            return res.status(500).send(error)
        }
    }
}