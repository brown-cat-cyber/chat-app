import React from "react"
import {
  MultiChatSocket,
  MultiChatWindow,
  useMultiChatLogic,
} from "react-chat-engine-advanced"
import CustomHeader from "@/components/customHeader"
import { StandardMessageForm } from "../customMessageForms/StandardMessageForm"
import Ai from "../customMessageForms/Ai"

const Chat = () => {
  const chatProps = useMultiChatLogic(
    import.meta.env.VITE_PROJECT_ID,
    "testuser",
    "1234"
  )

  return (
    <div style={{ flexBasis: "100%" }}>
      hello!
      <MultiChatSocket {...chatProps} />
      <MultiChatWindow
        {...chatProps}
        style={{ height: "100vh" }}
        renderChatHeader={(chat) => <CustomHeader chat={chat} />}
        renderMessageForm={(props) => {
          if (chatProps.chat?.title.startsWith("AiChat_")) {
            return <Ai props={props} activeChat={chatProps.chat} />
          }
          return (
            <StandardMessageForm props={props} activeChat={chatProps.chat} />
          )
        }}
      />
    </div>
  )
}

export default Chat
