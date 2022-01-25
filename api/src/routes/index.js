const { Router } = require('express');
const recipesRoutes= require('./recipes.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.use("/recipes",recipesRoutes);

module.exports = router;
