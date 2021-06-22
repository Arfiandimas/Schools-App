const jwt = require('jsonwebtoken')
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const { v4: uuidv4 } = require('uuid');
var CryptoJS = require("crypto-js");

const {OauthAccessToken} = require('../models')
const {BracketBrick} = require('../models')
const {OauthClient} = require('../models')

const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.SECRET_KEY

const getUser = async obj => {
    return await BracketBrick.findOne({
        where: obj
    })
}

const getOauthClientId = async obj => {
    return await OauthClient.findOne({
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
    async authenticate (oauthClient, user, modelType, scope) {
        const oauthClientQuery = await getOauthClientId({name: oauthClient});
        if (!oauthClientQuery) {
            throw new Error()
        }

        const mykey = CryptoJS.AES.encrypt(oauthClientQuery.secret, process.env.SECRET_KEY).toString();
        
        const exp = 60 * 60 * 24 * 365
        const t = new Date();
        const time = t.setSeconds(t.getSeconds() + exp)
        const oauthAccessTokenId = uuidv4()
        const payload = {id: {id: oauthAccessTokenId, user_id: user.id, model: modelType}}
        const token = jwt.sign (payload, mykey, { expiresIn: exp})
        const newAcessToken = new OauthAccessToken({
            id : oauthAccessTokenId,
            oauthClientId: oauthClientQuery.id,
            modelType : modelType,
            modelId : user.id,
            scope : scope,
            expiresAt : new Date(time)
        })

        await newAcessToken.save()
        return token
    }
}