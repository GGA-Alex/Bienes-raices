import { check, validationResult } from 'express-validator';
import Usuario from '../models/Usuario.js';
import { generarId } from '../helpers/tokens.js';

const formularioLogin = (req, res) => {
    res.render('auth/login', {
        pagina: 'Iniciar sesión'
    });
}

const formularioRegistro = (req, res) => {
    res.render('auth/registro', {
        pagina: 'Crear cuenta'
    });
}

const registrar = async (req, res) => {

    const { nombre, email, password } = req.body;

    await check('nombre').notEmpty().withMessage('El Nombre no puede ir vacio').run(req);
    await check('email').isEmail().withMessage('Forma de email incorrecta').run(req);
    await check('password').isLength({min:6}).withMessage('El password debe de tener al menos 6 caracteres').run(req);
    
    let resultado = validationResult(req);

    if(!resultado.isEmpty()) {
        return res.render('auth/registro', {
            pagina: 'Crear cuenta',
            errores: resultado.array(),
            usuario: {
                nombre: nombre,
                email: email
            }
        });
    }

    const existeUsuario = await Usuario.findOne( { where: { email } } );
    if(existeUsuario) {
        return res.render('auth/registro', {
            pagina: 'Crear cuenta',
            errores: [{msg: 'El Usuario ya esta registrado'}],
            usuario: {
                nombre: nombre,
                email: email
            }
        }); 
    }

    await Usuario.create({
        nombre,
        email,
        password,
        token: generarId()
    });

    res.render('templates/mensaje', {
        pagina: 'Cuenta creada correctamente',
        mensaje: 'Te hemos enviado un email de confirmación, presiona en el enlace.'
    });
}

const formularioOlvidePassword = (req, res) => {
    res.render('auth/olvide-password', {
        pagina: 'Recupera tu acceso a Bienes Raices'
    });
}

export {
    formularioLogin,
    formularioRegistro,
    registrar,
    formularioOlvidePassword
}