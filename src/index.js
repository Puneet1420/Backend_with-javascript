import dotenv from 'dotenv'
import connect_DB from "./db/index.js";
import app from "./app.js"

dotenv.config({
    path: './src/.env'
})

connect_DB()
.then(() => {
    app.listen(process.env.port || 8001, () => {
        console.log(`Server is running at Port ${process.env.port}`);
    })
})
.catch((err) => {
    console.log("MONGODB DATA CONNECTION FAILED !!!" , err);
})




