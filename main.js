const express=require("express")
const app=express()

const {Pool}=require("pg")
const {Client}=require("pg")

const path=require("node:path")
app.set("views", path.join(__dirname, "views"))
app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}))


const queries=require("./db/queries")
const all_games = require("./db/queries")

const con=new Pool({
    user:"postgres",
    host:"localhost",
    port:5432,
    password:"rethabilenongs",
    database:"inventory"
})

con.connect().then(()=>{
    console.log("Connected Succesfully")
}).catch(()=>{
    console.log("connecting Failed!!!")
})


// async functions


async function getGameType(type){
    if(type==="all"){
        type="*"
    }
    const {rows}= await con.query(`SELECT ${type} FROM  pc_games`)
    return rows

}

async function postGames(gamesObj){

}
// 

app.get("/",(req,res)=>{


res.render("form")

})



app.post("/",async(req,res)=>{
    console.log(req.body)
    const game_type=req.body.type
    const games= await getGameType(game_type)
    res.render("specific_games",{games:games,game_type:game_type})
})


/*
app.get("/all",async(req,res)=>{
const allgames=queries
    res.render("pc_games",{all_games})


})
    */


app.get("/add_games",(req,res)=>{
    res.render("add_games")
})
app.post("/add_games",async(req,res)=>{
    const {name,genre,type,mode,date}=req.body
    console.log(req.body)

    await con.query(`INSERT INTO pc_games(game_name,genre,game_mode,game_type,release_date) VALUES("${name}","${genre}","${mode}","${type}",${type})`,(err,res)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log("Package inserted Succesfully")
        }  
    })
    res.redirect("/")

})

const port=1000||2000

app.listen(port,()=>{
    console.log(`port is running on ${port}.....`)
})

module.exports=con