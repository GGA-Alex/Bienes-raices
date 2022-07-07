import express from 'express';
import usuarioRoutes from './routes/usuarioRoutes.js';

const app = express();

/**
 * * Routing
 */
app.use('/', usuarioRoutes);

/**
 * * Definición del puerto del proyecto
 */
app.listen(3000, () => {
    console.log(`El servidor esta funcionando correctamente`)
}) 