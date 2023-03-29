/* 
  NOTE: replace the openai.js file with this file and uncomment 
  the code if you want to use the newer version of the openai API.
  OPENAI released their gpt-3.5-turbo version on 3/1/2023, this is
  gpt-3.5 version which is what powers the ChatGPT bot. most of the
  code is the same with some minor changes.
*/

import express from "express"
import axios from "axios"
import dotenv from "dotenv"
import { openai } from "../index.js"
import HttpsProxyAgent from "https-proxy-agent"

dotenv.config()
const router = express.Router()

const proxySetting = {
  proxy: false,
  httpAgent: HttpsProxyAgent(`http://${process.env.OPENAI_PROXY_URL}`),
  httpsAgent: HttpsProxyAgent(`http://${process.env.OPENAI_PROXY_URL}`),
}

router.post("/text", async (req, res) => {
  try {
    const { text, activeChatId } = req.body
    console.log({ text, activeChatId })
    const response = await openai.createChatCompletion(
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant." }, // this represents the bot and what role they will assume
          { role: "user", content: text },
        ],
      },
      proxySetting
    )

    await axios.post(
      `https://api.chatengine.io/chats/${activeChatId}/messages/`,
      { text: response.data.choices[0].message.content },
      {
        headers: {
          "Project-ID": process.env.PROJECT_ID,
          "User-Name": process.env.BOT_USER_NAME,
          "User-Secret": process.env.BOT_USER_SECRET,
        },
      }
    )

    res.status(200).json({ text: response.data.choices[0].message.content })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message })
  }
})

router.post("/code", async (req, res) => {
  try {
    const { text, activeChatId } = req.body

    const response = await openai.createChatCompletion(
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are an assistant coder who responds with only code and no explanations.",
          }, // this represents the bot and what role they will assume
          { role: "user", content: text }, // the message that the user sends
        ],
      },
      proxySetting
    )

    await axios.post(
      `https://api.chatengine.io/chats/${activeChatId}/messages/`,
      { text: response.data.choices[0].message.content },
      {
        headers: {
          "Project-ID": process.env.PROJECT_ID,
          "User-Name": process.env.BOT_USER_NAME,
          "User-Secret": process.env.BOT_USER_SECRET,
        },
      }
    )

    res.status(200).json({ text: response.data.choices[0].message.content })
  } catch (error) {
    console.error("error", error.response.data.error)
    res.status(500).json({ error: error.message })
  }
})
router.post("/assist", async (req, res) => {
  try {
    const { text } = req.body
    const aiResponse = await openai.createChatCompletion(
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant that serves to only complete user's thoughts or sentences.",
          },
          { role: "user", content: `Finish my thought: ${text}` }, // the message that the user sends
        ],
      },
      proxySetting
    )
    res.status(200).json({ text: aiResponse.data.choices[0].message.content })
  } catch (error) {
    console.error("error", error)
    res.status(500).json({ error: error.message })
  }
})

export default router
