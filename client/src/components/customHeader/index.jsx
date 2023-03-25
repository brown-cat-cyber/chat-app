import React from "react"
import { ChatBubbleLeftRightIcon, PhoneIcon } from "@heroicons/react/24/solid"
const CustomHeader = ({ chat }) => {
  console.log("🚀 ~ file: index.jsx:4 ~ CustomHeader ~ chat:", chat.description)

  return (
    <>
      <div className="chat-header">
        <div className="flexbetween">
          <ChatBubbleLeftRightIcon className="icon-chat" />
          <h3 className="header-text">{chat.title}</h3>
        </div>

        <div className="flexbetween">
          <PhoneIcon className="icon-phone" />
        </div>
        {chat.description !== "⬅️ ⬅️ ⬅️" ? (
          <p className="header-text">{chat.description}</p>
        ) : (
          <p className="header-text">no chat selected!</p>
        )}
      </div>
    </>
  )
}

export default CustomHeader
