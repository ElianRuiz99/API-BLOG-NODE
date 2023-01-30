const validator = require('validator');

const validarDatos = ( params ) => {
    let validateTitle = !validator.isEmpty(params.title) && validator.isLength(params.title, {min: 5, max: undefined});
    let validateContent = !validator.isEmpty(params.content);

    if(!validateContent || !validateTitle){
        throw new Error("NO se ha validado la informacion")
    }
}

module.exports = {
    validarDatos
}