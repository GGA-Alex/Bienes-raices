import nodemailer from 'nodemailer';

const emailRegistro = async (datos) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_MAILTRAP_HOST,
        port: process.env.EMAIL_MAILTRAP_PORT,
        auth: {
          user: process.env.EMAIL_MAILTRAP_USER,
          pass: process.env.EMAIL_MAILTRAP_PASSWORD
        }
    });

    const {email, nombre, token} = datos;

    await transport.sendMail({
        from: 'BienesRaices.com',
        to: email,
        subject: 'Confirma tu cuenta en BienesRaices.com',
        text: 'Confirma tu cuenta en BienesRaices.com',
        html: `
            <p> Hola ${nombre}, comprueba tu cuenta en BienesRaices.com </p>
            
            <p>Tu cuenta ya esta lista, solo debes confirmarla en el siguiente enlace:</p>
            <a href="${process.env.BACKEND_URL}:${process.env.BACKEND_PORT ?? 3000}/auth/confirmar/${token}">Confirmar Cuenta</a>
            
            <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
        `
    });
}

export {
    emailRegistro
}