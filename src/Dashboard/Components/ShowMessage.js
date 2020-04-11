import React from "react";
import ReactEmoji from "react-emoji";

export default function ShowMessage({ message, user }) {
  return (
    <div
      className={message.sender === user ? "MessageSender" : "MessageReceiver"}
    >
      {ReactEmoji.emojify(message.content)}
    </div>
  );
}
