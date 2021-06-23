const mongoose = require("mongoose")

const config = require("config")

const db = config.get("mongoURI")


const connectdb = async ()=>{
    try {
        await mongoose.connect(db,{
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
            useCreateIndex: true 
        })

        console.log("Database Connected")
    } catch (error) {
        
        console.log(error)

        process.exit(1)
    }
}

 
module.exports =  connectdb