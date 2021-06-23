const bcrypt = require('bcrypt')

const AuthService = require('./../services/AuthService')

const {BracketBrick} = require('../models')

const getUser = async obj => {
    return await BracketBrick.findOne({
        where: obj
    })
}

module.exports = {
    async register (req, res) {
        try {
            const {name, email, password} = req.body
            const newUser = new BracketBrick({
                name,
                email,
                password
            })

            const userExist = await getUser({email : email})
            if (userExist) {
                return res.status(422).send({message: "email terdaftar !"})
            }

            const user = await newUser.save()
            
            const modelType = 'BracketBrick'
            const scope = 'bracketbrick'
            const oauthClient = 'jwt'
            const token = await AuthService.authenticate(oauthClient, user, modelType, scope)

            return res.status(201).send({user, token})
        } catch (error) {
            return res.status(500).send(error)
        }
    },

    async login (req, res) {
        try {
            const {email, password} = req.body
            if (email && password) {
                const user = await getUser({email : email})

                if (!user) {
                    return res.status(401).send({message: "email belum terdaftar !"})
                }
                
                const isMatch = await bcrypt.compare(password, user.password)

                if (isMatch) {
                    const modelType = 'BracketBrick'
                    const scope = 'bracketbrick'
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