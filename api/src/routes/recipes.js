const { Router } = require('express');
const { Recipes,Diets } = require('../db.js');
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
    const {name,searchDb,searchApi} = req.query;
    let promiseApi=[];
    if(!searchDb){
        promiseApi=axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true&number=1`)
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
    }
        let promiseDb=[];
    if(!searchApi){
        if(name){
            promiseDb=Recipes.findAll({
                include: Diets,
                where: {
                    name: {
                        [Op.iLike]: `%${name}%`,
                    },
                }
            })
        } else {
            promiseDb=Recipes.findAll({
                include: Diets
            });
        }
    }
    Promise.all([promiseApi,promiseDb]).then(([dataApi,dataDb])=>{
        dataDb= JSON.parse(JSON.stringify(dataDb,null,2))
        dataDb=dataDb.map(x=>{
            return {...x,diets:x.diets.map(d=>d.dietType)}
        })
        foods.push(...dataDb,...dataApi);
        if(foods.length) return res.send(foods)
        return res.send(["Not found"])
    });
})
router.get("/:idFood",async (req,res)=>{
    const {idFood}=req.params;
    let data;

    if(isNaN(idFood)) {
        data= await Recipes.findOne({
            include: Diets,
            where: {
                id: idFood
            }
        })
        data= JSON.parse(JSON.stringify(data,null,2))
        if(data.diets) data={...data,diets:data.diets.map(d=>d.dietType)}
    } else {
        data=await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true&number=40`)
        data=data.data.results.find(r=>r.id===idFood*1)
        data= {
            name:data.title,
            image:data.image,
            summary:data.summary,
            id:data.id,
            points:data.spoonacularScore,
            healthScore:data.healthScore,
            instructions:data.analyzedInstructions,
            diets:data.diets
            } 
    }
    res.send(data);
})
router.post("/:foodId/diet/:dietId",async (req,res)=>{
    try {
        const {foodId,dietId} = req.params;
        const food = await Recipes.findByPk(foodId);
        await food.addDiet(dietId);
        res.sendStatus(200)
    } catch (error) {
        console.log(error)
        res.sendStatus(402)
    }
})
router.post("/create", async (req,res)=>{
    try {
        let {name,image,summary,points,healthScore,instructions}=req.body;
        
        const newRecipe= await Recipes.create({name,image,summary,points,healthScore,instructions});
        //console.log(JSON.parse(newRecipe.dataValues.instructions))
        res.send(newRecipe)
    } catch (error) {
        res.sendStatus(402)
    }
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
    let dietsData=[];
    for (const diet in types) {
        dietsData.push(await Diets.create({dietType:types[diet]}));
    }
    res.send(dietsData);
})
module.exports = router;
