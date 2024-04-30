// await schema.parseAsync(req.body) is the line where you use zod to validate the request body data against the defined schema



const validate = (schema) => async (req, res, next) => {

    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody
        next()

    } catch (err) {
        const message = err.errors[0].message
        console.log(message)
        res.status(400).send({
            msg: message
        })
    }


}

export { validate }