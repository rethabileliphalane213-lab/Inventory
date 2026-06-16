const pool=require("../main")

async function all_games() {
    const {rows}=await pool.query("Select * from  pc_games")
    return rows
}







module.exports=all_games