import express from 'express';
import usuarioRoutes from './routes/usuarioRoutes.js';

const app = express();

/**
 * * Habilitar Pug
 */
 app.set('view engine', 'Pug');
 app.set('views', './views');

/**
 * * Routing
 */
app.use('/auth', usuarioRoutes);

/**
 * * Definición del puerto del proyecto
 */
app.listen(3000, () => {
    console.log(`El servidor esta funcionando correctamente`)
}) 