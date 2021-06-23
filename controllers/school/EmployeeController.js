const {SchoolEmployee} = require('./../../models')

module.exports = {
    async getEmployee (req, res) {
        const data = await SchoolEmployee.findAll()
        return res.status(200).send(data)
    }
}