import mongoose from "mongoose";

const connectDB = async() =>{
  try {

    mongoose.connection.on("connected", ()=>{console.log("Database Connected Sucessfully")})
    await mongoose.connect(`${process.env.MONGODB_CONN}/devlink`)
  } catch (error) {
    console.log("Database Connection Unsucessfull");
  }
}

export default connectDB