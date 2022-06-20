
const Joi = require('joi')


// REGISTER FORM AUTH VALIDATION
module.exports.addtodo = async (req, res, next) => {

    const { task, dateOfTask, completed } = req.body 

    const schema = Joi.object({
        task:   Joi.string()
                .alphanum() ,

        dateOfTask:     Joi.string()
                        .required(),
        completed:      Joi.string()
                        .required()
    })

    const { error, value } = schema.validate({ task, dateOfTask, completed})

    if (  error != undefined && error.details[0].type == 'string.pattern.base' ) {
            error.details[0].message = 'Task Name '
        }
    
    req.authErrMessage = error == undefined ? undefined : error.details[0].message
    req.authenticatedUser = value

    console.log('req error message: ', req.authErrMessage)
    next()
}