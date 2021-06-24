const Joi =  require('joi')

module.exports = {
    async email (req, res, next) {
        const schema = Joi.object({
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).max(255).required(),
            password: Joi.string().max(255).required()
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