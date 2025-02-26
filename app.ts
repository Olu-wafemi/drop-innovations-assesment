import express from "express"
import cors from "cors"
import helmet from "helmet"
import routes from "./src/routes/index"
import { connectDB } from "./src/config/database"


const app = express()

const dbConnection = async()=>{
    await connectDB()
}

dbConnection()


app.use(express.json())
app.use(cors());
app.use(helmet())
app.use("/api", routes)


export default app;