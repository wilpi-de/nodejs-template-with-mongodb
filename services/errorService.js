const ApiError = require("./../errors/apiError");
const ValidationError = require("./../errors/validationError");

    
exports.handleJsonParsingError = error => {
    const message = "JSON-Format ungültig.";
    return new ApiError(message, 400);
}

exports.handleMongoDublicateFieldsError = error => {
    const errors = Object.keys(error.keyValue).map(path =>  {
        return { path, message: "Bereits vorhanden." };
    });
    return new ValidationError(errors, 400);
}

exports.handleMongoValidationError = error => {
    let errors = [];

    error.errInfo.details.schemaRulesNotSatisfied.map(item => {
        if(item.operatorName === "required") {
            item.missingProperties.map(path => {
                errors.push( { path, message: "Angaben werden benötigt."} );
                return;
            });
        } else {
            item.propertiesNotSatisfied.map(properties => {
                errors.push( { path: properties.propertyName, message: "Falsches Format."} );
                return;
            });
        }
    });
    
    return new ValidationError(errors, 400);
}