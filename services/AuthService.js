const jwt = require('jsonwebtoken')
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const {AccessToken} = require('../models')

const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = "secret_key"


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
    async registerService (user, modelType, scope) {
        const payload = {id: user}
        const token = jwt.sign (payload, jwtOptions.secretOrKey)

        const newAcessToken = new AccessToken({
            payload : JSON.stringify(payload),
            secretKey : jwtOptions.secretOrKey,
            modelType : modelType,
            modelId : user.id,
            scope : scope
        })

        await newAcessToken.save()

        return token
    }
}