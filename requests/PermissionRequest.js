const Joi =  require('joi')

module.exports = {
    async store (req, res, next) {
        const schema = Joi.object({
            name: Joi.string().max(255).required()
        })

        const result = await schema.validate(req.body);
        if( result.error ) {
            return res.status(422).json({
                message : result.error.details[0].message
            })
        }else {
            if(!req.value) {
                req.value = {}
            }
            req.value['body'] = result.value;
            next();
        }
    },
    async givePermission (req, res, next) {
        const schema = Joi.object({
            permissionId: Joi.array().required()
        })

        const result = await schema.validate(req.body);
        if( result.error ) {
            return res.status(422).json({
                message : result.error.details[0].message
            })
        }else {
            if(!req.value) {
                req.value = {}
            }
            req.value['body'] = result.value;
            next();
        }
    }
}