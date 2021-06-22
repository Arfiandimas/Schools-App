const jwt = require('jsonwebtoken')

const {BracketBrick} = require('../models')
const {School} = require('../models')
const {SchoolEmployee} = require('../models')
const {Student} = require('../models')

module.exports = {
    async auth (req, res, next) {
        try {
            const token = req.header('Authorization').replace('Bearer ', '')
            const decode = jwt.verify(token, process.env.SECRET_KEY)
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