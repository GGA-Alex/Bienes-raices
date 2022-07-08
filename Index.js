import express from 'express';
import csrf from 'csurf';
import cookieParser from 'cookie-parser';
import db from './config/db.js';
import usuarioRoutes from './routes/usuarioRoutes.js';

const app = express();

/**
 * * Habilitar lectura de datos de formulario
 */
app.use( express.urlencoded({extended: true}) );

/**
 * * Habilitar cookie parser
 */
app.use( cookieParser() );

/**
 * * Habilitar CSRF
 */
app.use( csrf({cookie: true}) );

/**
 * * Conexión a base de datos
 */
try {
    await db.authenticate();
    db.sync();
    console.log('Conexión correcta a la base de datos')
} catch(error) {
    console.log(error);
}

/**
 * * Habilitar Pug
 */
 app.set('view engine', 'Pug');
 app.set('views', './views');

 /**
  * * Carpeta publica
  */
 app.use(express.static('public'))

/**
 * * Routing
 */
app.use('/auth', usuarioRoutes);

/**
 * * Definición del puerto del proyecto
 */
app.listen(process.env.PORT || 3000, () => {
    console.log(`El servidor esta funcionando correctamente`)
}) 