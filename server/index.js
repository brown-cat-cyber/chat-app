import { Configuration, OpenAIApi } from "openai"
import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import openAiRoutes from "./routes/openai.js"
dotenv.config()
const app = express()
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"))
// not common
app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())
app.use("/openai", openAiRoutes)
const configuration = new Configuration({
  apiKey: process.env.OPEN_API_KEY,
  // basePath: `https://${process.env.OPENAI_PROXY_URL}/v1`,
})
export const openai = new OpenAIApi(configuration)

const PORT = process.env.PORT || 9000
app.listen(PORT, () => {
  console.log(`Example app listening at ${PORT}`)
})
