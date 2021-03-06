const jwt = require('jsonwebtoken')
const CryptoJS = require("crypto-js");

const {BracketBrick} = require('../models')
const {School} = require('../models')
const {SchoolEmployee} = require('../models')
const {Student} = require('../models')
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
    async auth (req, res, next) {
        try {
            const provider = req.header('Provider')
            const finalSecretKey = await secretKey(provider) + process.env.SECRET_KEY
            const token = req.header('Authorization').replace('Bearer ', '')
            const decode = jwt.verify(token, finalSecretKey)
            if (decode.id.model === 'BracketBrick') {
                var user = await BracketBrick.findOne({ 
                    where: {
                        id: decode.id.user_id
                    }
                })
            } else if (decode.id.model === 'School') {
                var user = await School.findOne({ 
                    where: {
                        id: decode.id.user_id
                    }
                })
            } else if (decode.id.model === 'SchoolEmployee') {
                var user = await SchoolEmployee.findOne({ 
                    where: {
                        id: decode.id.user_id
                    }
                })
            } else if (decode.id.model === 'Student') {
                var user = await Student.findOne({ 
                    where: {
                        id: decode.id.user_id
                    }
                })
            }
            
            if (!user) {
                throw new Error()
            }

            req.token = token
            req.user = user
            next()
        } catch (error) {
            res.status(401).send('Unauthorized')
        }
    }
}
// module.exports = auth