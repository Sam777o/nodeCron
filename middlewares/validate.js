import HttpError from "http-errors";

const validate = (schema, path) => async (req, res, next) =>{
    try {
        const isValid = await schema.validate(req[path],{
            abortEarly:false
        });

        if (isValid.error) {
            const errors = {};

            isValid.error.details.forEach(error => {
                const errorKey = error.path.join('.');
                const errorMessage = error.message;

                console.log(errorKey + ': ' + errorMessage, 5555);
                errors.error = errorMessage;
                console.log(errors,8888888888)

            });
            throw HttpError(422, { errors:errors });

        }
        next();
    }catch (err){
        next(err)
    }
}

export default validate