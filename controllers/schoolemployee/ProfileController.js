const {SchoolEmployee} = require('./../../models')

module.exports = {
    async index (req, res) {
        try {
            return res.status(200).send(req.user)   
        } catch (error) {
            return res.status(500).send(error)
        }
    }
}