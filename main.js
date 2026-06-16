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
const selectAll=async()=>{

   const table=await con.query("SELECT * FROM pc_games")
   return table
}

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

app.get("/",async(req,res)=>{
const table= await selectAll()
console.log(table)
res.render("home",{table:table.rows})

})



app.post("/",async(req,res)=>{
    console.log(req.body)
    const game_type=req.body.type
    const games= await getGameType(game_type)
    res.render("specific_games",{games:games,game_type:game_type})
})





app.get("/add_games",(req,res)=>{
    res.render("add_games")
})
app.post("/add_games", async (req, res) => {
  const { name, genre, type, mode, date } = req.body;

  try {
    await con.query(
      `INSERT INTO pc_games
       (game_name, genre, game_mode, game_type, release_date)
       VALUES ($1, $2, $3, $4, $5)`,
      [name, genre, mode, type, date]
    );

    console.log("Package inserted Successfully");
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.status(500).send("Database error");
  }
});





const port=1000||2000

app.listen(port,()=>{
    console.log(`port is running on ${port}.....`)
})

module.exports=con