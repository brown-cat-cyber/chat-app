import { usePostAiTextMutation, usePostAiAssistMutation } from "@/state/api"
import React, { useState, useEffect } from "react"
import MessageFormUI from "./MessageFormUI"
import { useDebounce } from "react-use"

const Ai = ({ props, activeChat }) => {
  const [message, setMessage] = useState("")
  const [attachment, setAttachment] = useState("")
  const [triggerChat] = usePostAiTextMutation()
  const [appendText, setAppendText] = useState("")
  const [triggerAssist, assistResult] = usePostAiAssistMutation()

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
    triggerChat(form)
    setMessage("")
    setAttachment("")
  }

  useDebounce(
    () => {
      triggerAssist({ text: message })
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
    let returnedText = assistResult.data?.text
    if (returnedText) {
      setAppendText(returnedText)
    }
  }, [assistResult])

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

export default Ai
