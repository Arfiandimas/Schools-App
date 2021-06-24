const jwt = require('jsonwebtoken')
const passport = require('passport')
const { v4: uuidv4 } = require('uuid');
const CryptoJS = require("crypto-js");

const {OauthAccessToken} = require('../models')
const {OauthClient} = require('../models')

const getOauthClient = async obj => {
    return await OauthClient.findOne({
        where: obj
    })
}

const secretKey = async oauthClient => {
    const oauthClientQuery = await getOauthClient({name: oauthClient});
    // const encrypt = CryptoJS.HmacRIPEMD160(oauthClientQuery.secret, process.env.SECRET_KEY).toString();
    // // const decrypt = CryptoJS.decrypt(encrypt, process.env.SECRET_KEY);
    return oauthClientQuery.secret
}

module.exports = {
    async authenticate (oauthClient, user, modelType, scope) {
        const finalSecretKey = await secretKey(oauthClient) + process.env.SECRET_KEY
        const exp = 60 * 60 * 24 * 365
        const t = new Date();
        const time = t.setSeconds(t.getSeconds() + exp)
        const oauthAccessTokenId = uuidv4()
        const payload = {id: {id: oauthAccessTokenId, user_id: user.id, model: modelType}}
        const token = jwt.sign (payload, finalSecretKey, { expiresIn: exp})
        const oauthClientQuery = await getOauthClient({name: oauthClient});
        const newAcessToken = new OauthAccessToken({
            id : oauthAccessTokenId,
            oauthClientId: oauthClientQuery.id,
            modelType : modelType,
            modelId : user.id,
            scope : scope,
            expiresAt : new Date(time)
        })

        await newAcessToken.save()
        return {token: token, provider: oauthClientQuery.name}
    }
}