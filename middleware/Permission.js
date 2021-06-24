const jwt = require('jsonwebtoken')
const {School, SchoolEmployee, OauthClient, ModelHasPermission, Permission} = require('./../models')

const getPermissionSchool = async obj => {
    return await School.findOne({
        where: obj,
        include: [{ 
            model:ModelHasPermission, 
            include: [{
                model:Permission,
                where: {name : 'attendance'}
            }], 
        }]
    })
}

const getPermissionSchoolEmployee = async obj => {
    return await SchoolEmployee.findOne({
        where: obj,
        include: [{ 
            model:ModelHasPermission, 
            include: [{
                model:Permission,
                where: {name : 'attendance'}
            }], 
        }]
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
    async attendance (req, res, next) {
        const provider = req.header('Provider')
        const finalSecretKey = await secretKey(provider) + process.env.SECRET_KEY
        const token = req.header('Authorization').replace('Bearer ', '')
        const decode = jwt.verify(token, finalSecretKey)

        if (decode.id.model == 'School') {
            const data = await getPermissionSchool({id : decode.id.user_id})
            if (data.ModelHasPermissions.length === 0) {
                return res.status(403).send({message : 'You do not have the required permission.'})
            }
            next()
        } else if (decode.id.model == 'SchoolEmployee') {
            const data = await getPermissionSchoolEmployee({id : decode.id.user_id})
            if (data.ModelHasPermissions.length === 0) {
                return res.status(403).send({message : 'You do not have the required permission.'})
            }
            next()
        } else {
            res.status(500).send({message : 'internal server error'})
        }
    }
}