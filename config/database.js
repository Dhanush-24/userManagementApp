const mongoose=require('mongoose');
let connectDB=async()=>{
    await mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log("connected to db"))
    .catch(()=>console.log("failed to connect with db"))
}

module.exports=connectDB;