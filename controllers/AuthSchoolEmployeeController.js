const bcrypt = require('bcrypt')
const AuthService = require('./../services/AuthService')

const {SchoolEmployee} = require('../models')

const getSchoolEmployee = async obj => {
    return await SchoolEmployee.findOne({
        where: obj
    })
}

module.exports = {
    async login (req, res) {
        try {
            const {email, password} = req.body
            if (email && password) {
                const user = await getSchoolEmployee({email : email})
                if (!user) {
                    return res.status(401).send({message: "email belum terdaftar !"})
                }

                const isMatch = await bcrypt.compare(password, user.password)

                if (isMatch) {
                    const modelType = 'SchoolEmployee'
                    const scope = 'schoolemployee'
                    const oauthClient = 'jwt'
                    const token = await AuthService.authenticate(oauthClient, user, modelType, scope)
                    return res.status(200).send({user, token})
                } else {
                    return res.status(401).send({message: "password salah !"})
                }
            } else {
                return res.status(401).send({message: "isikan email dan password !"})
            }
        } catch (error) {
            return res.status(500).send(error)
        }
    }
}