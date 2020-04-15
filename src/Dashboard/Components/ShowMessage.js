import React from "react";
import ReactEmoji from "react-emoji";

export default function ShowMessage({ message, user }) {
  return (
    <div
      className={
        message.user_id === user.id ? "MessageSender" : "MessageReceiver"
      }
    >
      {ReactEmoji.emojify(message.content)}
    </div>
  );
}
