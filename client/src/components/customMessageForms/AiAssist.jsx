import { usePostAiAssistMutation } from "@/state/api"
import React, { useEffect, useState } from "react"
import MessageFormUI from "./MessageFormUI"
import { useDebounce } from "react-use"

const AiAssist = ({ props, activeChat }) => {
  const [message, setMessage] = useState("")
  const [attachment, setAttachment] = useState("")
  const [appendText, setAppendText] = useState("")
  const [trigger, resultAssist] = usePostAiAssistMutation()

  const handleChange = (e) => setMessage(e.target.value)

  const handleSubmit = async () => {
    const date = new Date()
      .toISOString()
      .replace("T", " ")
      .replace("Z", `${Math.floor(Math.random() * 1000)}+00:00`)
    const at = attachment ? [{ blob: attachment, file: attachment.name }] : []
    const form = {
      attachments: at,
      created: date,
      sender_username: props.username,
      text: message,
      activeChatId: activeChat.id,
    }

    props.onSubmit(form)
    trigger(form)
    setMessage("")
    setAttachment("")
  }

  useDebounce(
    () => {
      trigger({ text: message })
    },
    250,
    [message]
  )

  const handleKeyDown = (e) => {
    // enter and tab
    if (e.keyCode === 9 || e.keyCode === 13) {
      e.preventDefault()
      setMessage(`${message} ${appendText}`)
    }
  }
  useEffect(() => {
    let returnedText = resultAssist.data?.text
    if (returnedText) {
      setAppendText(returnedText)
    }
  }, [resultAssist])

  return (
    <MessageFormUI
      setAttachment={setAttachment}
      message={message}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      appendText={appendText}
      handleKeyDown={handleKeyDown}
    />
  )
}

export default AiAssist
