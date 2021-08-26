const errorService = require("./../../services/errorService")

module.exports = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    let error = {...err};

    //DELETE IN PRODUCTION
    // res.json(err)
    console.log(err)


    // HANDLE PARSE ERRORS
    if(error.type === 'entity.parse.failed') error = errorService.handleJsonParsingError(error);

    // HANDLE MONGO ERRORS
    if(error.code === 121) error = errorService.handleMongoValidationError(error);
    if(error.code === 11000) error = errorService.handleMongoDublicateFieldsError(error);

    
    // SEND RESPONSE
    if(error.isOperational) {
        res.status(error.statusCode).json(error);
    } else {
        res.status(500).json({
            status: "error",
            message: "Oh, da ging etwas gewaltig schief...",
            error: err.name
        });
    }
}
