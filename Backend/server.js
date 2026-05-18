require("dotenv").config(); //whatever variable we will be creating in .env file we can access them anywhere in our express server.

const app = require("./src/app");
const connectDB = require("./src/config/database");
const invokeGeminiAi = require("./src/services/ai.service");

connectDB();

app.get('/', (req, res) => {
  res.send('API is running 🚀')
})

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("Server is running at Port 3000");

})