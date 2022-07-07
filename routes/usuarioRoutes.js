import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.json({msg:'Prueba de routing con get'});
});

export default router;