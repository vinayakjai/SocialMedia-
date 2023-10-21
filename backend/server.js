const app=require("./app.js");

const PORT=process.env.PORT || 4200;

app.listen(PORT,(req,res)=>{
  
    console.log(`server is running at http://localhost:${PORT}`)
    
})