const jwt = require('jsonwebtoken')

const {OauthClient} = require('../models')
const {OauthAccessToken} = require('../models')

const getOauthAccessToken = async obj => {
    return await OauthAccessToken.findOne({
        where: obj,
        attributes: ['scope']
    })
}

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
    async bracketbrickScope(req, res, next) {
        try {
            const provider = req.header('Provider')
            const finalSecretKey = await secretKey(provider) + process.env.SECRET_KEY
            const token = req.header('Authorization').replace('Bearer ', '')
            const decode = jwt.verify(token, finalSecretKey)
            const scope = await getOauthAccessToken({id:decode.id.id})
            
            if (scope.scope === 'bracketbrick') {
                next()
            } else {
                res.status(403).send('Not Authorized.')
            }
        } catch (error) {
            res.status(403).send('Not Authorized.')
        }
    },
    async schoolScope(req, res, next) {
        try {
            const provider = req.header('Provider')
            const finalSecretKey = await secretKey(provider) + process.env.SECRET_KEY
            const token = req.header('Authorization').replace('Bearer ', '')
            const decode = jwt.verify(token, finalSecretKey)
            const scope = await getOauthAccessToken({id:decode.id.id})
            
            if (scope.scope === 'school') {
                next()
            } else {
                res.status(403).send('Not Authorized.')
            }
        } catch (error) {
            res.status(403).send('Not Authorized.')
        }
    },
    async schoolEmployeeScope(req, res, next) {
        try {
            const provider = req.header('Provider')
            const finalSecretKey = await secretKey(provider) + process.env.SECRET_KEY
            const token = req.header('Authorization').replace('Bearer ', '')
            const decode = jwt.verify(token, finalSecretKey)
            const scope = await getOauthAccessToken({id:decode.id.id})
            
            if (scope.scope === 'schoolemployee') {
                next()
            } else {
                res.status(403).send('Not Authorized.')
            }
        } catch (error) {
            res.status(403).send('Not Authorized.')
        }
    },
    async studentScope(req, res, next) {
        try {
            const provider = req.header('Provider')
            const finalSecretKey = await secretKey(provider) + process.env.SECRET_KEY
            const token = req.header('Authorization').replace('Bearer ', '')
            const decode = jwt.verify(token, finalSecretKey)
            const scope = await getOauthAccessToken({id:decode.id.id})
            
            if (scope.scope === 'student') {
                next()
            } else {
                res.status(403).send('Not Authorized.')
            }
        } catch (error) {
            res.status(403).send('Not Authorized.')
        }
    }
}