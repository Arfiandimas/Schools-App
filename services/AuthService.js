const jwt = require('jsonwebtoken')
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const {AccessToken} = require('../models')
const {BracketBrick} = require('../models')

const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.SECRET_KEY

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
    async authenticate (user, modelType, scope) {
        const payload = {id: {id: user.id,model: modelType}}
        const token = jwt.sign (payload, process.env.SECRET_KEY)
        const newAcessToken = new AccessToken({
            payload : JSON.stringify(payload),
            secretKey : process.env.SECRET_KEY,
            modelType : modelType,
            modelId : user.id,
            scope : scope
        })

        await newAcessToken.save()

        return token
    },

    async login (user, modelType, scope) {
        const payload = {id: {id: user.id,model: modelType}}
        const token = jwt.sign (payload, process.env.SECRET_KEY)

        // const token = jwt.sign (payload, process.env.SECRET_KEY);
        // const decode = jwt.verify(token, process.env.SECRET_KEY);
        // res.status(201).send([payload.id, decode.id])
        
        const newAcessToken = new AccessToken({
            payload : JSON.stringify(payload),
            secretKey : process.env.SECRET_KEY,
            modelType : modelType,
            modelId : user.id,
            scope : scope
        })

        await newAcessToken.save()

        return token
    }
}