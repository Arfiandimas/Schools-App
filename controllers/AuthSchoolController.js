const bcrypt = require('bcrypt')

const AuthService = require('./../services/AuthService')

const {School} = require('../models')

const getSchool = async obj => {
    return await School.findOne({
        where: obj
    })
}

module.exports = {
    async register (req, res) {
        try {
            const {name, logo, npsn, email, password} = req.body
            const newSchool = new School({
                name,
                logo,
                npsn,
                email,
                password
            })

            const schoolExist = await getSchool({email : email})
            if (schoolExist) {
                return res.status(422).send({message: "email terdaftar !"})
            }

            const school = await newSchool.save()
            
            const modelType = 'School'
            const scope = 'school'
            const oauthClient = 'jwt'
            const token = await AuthService.authenticate(oauthClient, school, modelType, scope)

            return res.status(201).send({school, token})
        } catch (error) {
            return res.status(500).send(error)
        }
    },

    async login (req, res) {
        try {
            const {email, password} = req.body
            if (email && password) {
                const school = await getSchool({email : email})

                if (!school) {
                    return res.status(401).send({message: "email belum terdaftar !"})
                }
                
                const isMatch = await bcrypt.compare(password, school.password)
                
                if (isMatch) {
                    const modelType = 'School'
                    const scope = 'school'
                    const oauthClient = 'jwt'
                    const token = await AuthService.authenticate(oauthClient, school, modelType, scope)
                    return res.status(200).send({school, token})
                } else {
                    return res.status(401).send({message: "password salah !"})
                }
            } else {
                return res.status(401).send({message: "isikan email dan password !"})
            }
        } catch (error) {
            return res.status(500).send(error)
        }
    },

    async protected (req, res) {
        try {
            return res.status(200).send({data : req.user, message: "token valid !"})
        } catch (error) {
            return res.status(500).send(error)
        }
    }
}