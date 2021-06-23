const {Permission} = require('./../../models')

module.exports = {
    async getPermission (req, res) {
        const data = await Permission.findAll({
            order: [
                ['createdAt', 'DESC']
            ]
        })
        return res.status(200).send(data)
    }
}