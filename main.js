const express=require("express")
const app=express()
require("dotenv").config();

const {Pool}=require("pg")
const {Client}=require("pg")

const path=require("node:path")
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname,'public')))
app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}))


const queries=require("./db/queries")
const all_games = require("./db/queries")

console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);

const con = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

con.connect()
  .then(() => console.log("DB connected successfully 🟢"))
  .catch(err => console.error("DB connection failed 🔴", err));
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
async function search(obj) {
  if (obj.id) {
    const result = await con.query(
      "SELECT * FROM pc_games WHERE id = $1",
      [obj.id]
    );

    return result.rows;
  }

  if (obj.name) {
    const result = await con.query(
      "SELECT * FROM pc_games WHERE game_name = $1",
      [obj.name]
    );

    return result.rows;
  }

  if (obj.genre) {
    const result = await con.query(
      "SELECT * FROM pc_games WHERE genre = $1",
      [obj.genre]
    );

    return result.rows;
  }

  if (obj.mode) {
    const result = await con.query(
      "SELECT * FROM pc_games WHERE game_mode = $1",
      [obj.mode]
    );

    return result.rows;
  }

  return [];
}



async function deleteSeach(obj){


  const result = await con.query(
  "SELECT * FROM pc_games WHERE id=$1",
  [obj.id]
)
if (result.rows.length === 0) {
  console.log("Game not found")
  return
}
const oldGame = result.rows[0]
   await con.query(`DELETE FROM pc_games WHERE id=$1`, [oldGame.id])

   
    
}

async function update(obj) {


const result = await con.query(
  "SELECT * FROM pc_games WHERE id=$1",
  [obj.id]
)
if (result.rows.length === 0) {
  console.log("Game not found")
  return
}

const oldGame = result.rows[0]
const new_name = obj.name || oldGame.game_name
const new_genre = obj.genre || oldGame.genre
const new_game_mode = obj.mode || oldGame.game_mode
const new_game_type = obj.type || oldGame.game_type
const new_release = obj.date || oldGame.release_date


    await con.query(
  `UPDATE pc_games
   SET game_name=$1,
       genre=$2,
       game_mode=$3,
       game_type=$4,
       release_date=$5
   WHERE id=$6`,
   [
     new_name,
     new_genre,
     new_game_mode,
     new_game_type,
     new_release,
     obj.id
   ]
)
  }
  

// 

app.get("/",async(req,res)=>{
const table= await selectAll()

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
  const { name, genre, type, mode, date, publisher, price,qty,platform,ratings,downloads } = req.body;
  console.log(req.body)

  try {
    await con.query(
      `INSERT INTO pc_games
       (game_name, genre, game_mode, game_type, release_date,publisher,price,stock_qty,platform,rating,downloads)
       VALUES ($1, $2, $3, $4, $5,$6,$7,$8,$9,$10,$11)`,
      [name, genre, mode, type, date,publisher,price,qty,platform,ratings,downloads]
    );

    console.log("Package inserted Successfully");
    res.redirect("/");
  }catch (err) {
  console.error("INSERT ERROR 🔴", err.message);
  console.error(err); 
  res.status(500).send(err.message);
}
});




app.get("/search",(req,res)=>{
    res.render("Search")
})

app.post("/search", async (req, res) => {
  const info = await search(req.body);

  if (info.length === 0) {
    return res.status(404).send("Game not found");
  }

  res.render("found", { info });
});


app.get("/update",(req,res)=>{
  res.render("update")
})
app.post("/update",async(req,res)=>{
  console.log(req.body)
await update(req.body)
res.redirect("/")
})



app.get("/delete",(req,res)=>{
  res.render("delete")
})
app.post("/delete",async(req,res)=>{
await deleteSeach(req.body)
res.redirect("/")
})






















const port=1000||2000

app.listen(port,()=>{
    console.log(`port is running on ${port}.....`)
})

module.exports=con