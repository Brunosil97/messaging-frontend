import React from "react";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

export default function ShowChats({
  friendName,
  message,
  index,
  chat,
  HandleSelectMessageClick,
}) {
  return (
    <div
      className={index % 2 ? "ChatListEven" : "ChatListOdd"}
      onClick={() => HandleSelectMessageClick(chat)}
    >
      <ListItemAvatar>
        {/* <Avatar className="Avatar">{friendName[0].toUpperCase()}</Avatar> */}
      </ListItemAvatar>
      <div className="ChatInfo">
        {/* <h3>{friendName}</h3> */}
        <p>{message}</p>
      </div>
    </div>
  );
}
