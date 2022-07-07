import express from 'express';

const app = express();

/**
 * * Routing
 */
app.get('/', (req, res) => {
    res.json({msg:'Prueba de routing'});
});

/**
 * * Definición del puerto del proyecto
 */
app.listen(3000, () => {
    console.log(`El servidor esta funcionando correctamente`)
}) 