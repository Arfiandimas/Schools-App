const jwt = require('jsonwebtoken')
const passport = require('passport')
const bcrypt = require('bcrypt');
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const {BracketBrick} = require('../models')

const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = "secret_key"

const getUser = async obj => {
    return await BracketBrick.findOne({
        where: obj
    })
}

const strategy = new JwtStrategy(jwtOptions, (jwt_payload, next) => {
    const user = getUser({id: jwt_payload.id})

    if(user) {
        next(null, user);
    } else {
        next(null, false);
    }
})

passport.use(strategy)

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
                res.status(422).send({message: "email terdaftar !"})
            }

            await newUser.save()

            const user = await getUser({email : email})
            const payload = {id: user.id}
            const token = jwt.sign (payload, jwtOptions.secretOrKey)
            res.status(201).send({user : newUser, token})
        } catch (error) {
            res.status(500).send(error)
        }
    },

    async login (req, res) {
        try {
            const {email, password} = req.body
            if (email && password) {
                const user = await getUser({email : email})

                if (!user) {
                    res.status(401).send({message: "email belum terdaftar !"})
                }
                
                const isMatch = await bcrypt.compare(password, user.password)

                if (isMatch) {
                    const payload = {id: user}
                    const token = jwt.sign (payload, jwtOptions.secretOrKey);
                    
                    const decode = jwt.verify(token, jwtOptions.secretOrKey);
                    res.status(201).send([payload.id, decode.id])

                    res.status(201).send({user, token})
                } else {
                    res.status(401).send({message: "password salah !"})
                }
            } else {
                res.status(401).send({message: "isikan email dan password !"})
            }
        } catch (error) {
            res.status(500).send(error)
        }
    },

    async protected (req, res) {
        try {
            const token = req.header('Authorization').replace('Bearer ', '');
            const decode = jwt.verify(token, jwtOptions.secretOrKey);
            res.status(200).send({data : decode.id, message: "token valid !"})
        } catch (error) {
            res.status(500).send(error)
        }
    }
}