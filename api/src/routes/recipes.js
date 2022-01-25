const { Router } = require('express');
const { Recipe,Diet } = require('../db.js');
const { Op } = require('sequelize');
const axios = require('axios');
const {apiKey} = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/",(req,res)=>{
    let foods=[];
    const {name} = req.query;
    let promiseApi=axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true&number=40`)
        .then(({data})=>{
            let info=data.results.map(f=>{
                return {
                    name:f.title,
                    image:f.image,
                    summary:f.summary,
                    id:f.id,
                    points:f.spoonacularScore,
                    healthScore:f.healthScore,
                    instructions:f.analyzedInstructions,
                    diets:f.diets
                }
            })
            return name?info.filter(f=>f.name.includes(name)):info;
        })
        let promiseDb;
    if(name){
        promiseDb=Recipe.findAll({
            include: Diet,
            where: {
                name: {
                    [Op.iLike]: `%${name}%`,
                },
            }
        })
    } else {
        promiseDb=Recipe.findAll({
            include: Diet
        });
    }
    Promise.all([promiseApi,promiseDb]).then(([dataApi,dataDb])=>{
        foods.push(...dataApi,...dataDb);
        return res.send(foods);
    });
})
router.get("/:idFood",async (req,res)=>{
    const {idFood}=req.params;
    let food;
    if(idFood*1) {
        food= await Recipe.findOne({
            include: Diet,
            where: {
                id: idFood
            }
        })
    } else {
        food= await axios.get(`https://api.spoonacular.com/recipes/${idFood}/information?apiKey=${apiKey}`) //ver si se puede, si no traer todos los datos y usar .find
    }
    res.send(food);
})
router.post("/:foodId/diet/:dietId",async (req,res)=>{
    const {foodId,dietId} = req.params;
    const food = await Recipe.findByPk(foodId);
    await food.addDiet(dietId);
    res.sendStatus(200)
})
router.post("/create", async (req,res)=>{
    const {name,image,summary,points,healthScore,instructions}=req.body;
    const newRecipe= await Recipe.create({name,image,summary,points,healthScore,instructions});
    res.send(newRecipe)
})
router.post("/diet", async (req,res)=>{
    const types={
        glutenFree: "gluten free",
        ketogenic: "ketogenic",
        vegetarian: "vegetarian",
        lactoVegetarian: "dairy free",
        ovoVegetarian: "lacto ovo vegetarian",
        vegan: "vegan",
        pescatarian: "pescatarian",
        paleo: "paleolithic",
        primal: "primal",
        lowFODMAP: "fodmap friendly",
        whole30: "whole 30"
    }
    for (const diet in types) {
        await Diet.create({dietTypes:diet});
    }
    res.send(types);
})
module.exports = router;
