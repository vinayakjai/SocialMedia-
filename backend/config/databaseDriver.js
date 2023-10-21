const mongoose=require("mongoose");

const connecttodb=async()=>{
    try{
        
      const res=  await mongoose.connect('mongodb://127.0.0.1:27017/mernSOCIAL')
      console.log("connected to database");
    }catch(err){

        console.log("can't connect to database due to",err);

    }
}
module.exports=connecttodb;