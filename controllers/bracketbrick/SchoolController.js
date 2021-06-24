const {School} = require('./../../models')

const getSchool = async obj => {
    return await School.findOne({
        where: obj
    })
}

module.exports = {
    async index (req, res) {
        try {
            const data = await School.findAll()
            return res.status(200).send(data)   
        } catch (error) {
            return res.status(500).send(error)
        }
    },
    async store (req, res) {
        try {
            const newData = new School({
                name: req.body.name,
                districtId: req.body.districtId,
                logo: req.body.logo,
                npsn: req.body.npsn,
                email: req.body.email,
                password: req.body.password
            })
    
            const schoolExist = await getSchool({email : req.body.email})
            if (schoolExist) {
                return res.status(422).send({message: "email terdaftar !"})
            }
    
            const data = await newData.save()
    
            return res.status(201).send(newData)     
        } catch (error) {
            return res.status(500).send(error)
        }
    }
}