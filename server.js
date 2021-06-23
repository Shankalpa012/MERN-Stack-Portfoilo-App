const express = require('express');
const connectdb = require('./config/db.js');

const app = express();

connectdb();

//body parser
app.use(express.json({extended:false}))

app.get('/',(req,res)=>{res.send("API is Running")})

//defining Routes
app.use("/user",require("./routes/User"))
app.use("/auth",require("./routes/Auth"))
app.use("/posts",require("./routes/Posts"))
app.use("/profile",require("./routes/profile"))

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{console.log(`Server started at PORT ${PORT}`)})

