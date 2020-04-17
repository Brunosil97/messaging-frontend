import React, { Component } from "react";
import ShowChat from "../Components/ShowChats";
import NewMessageBtn from "../Components/NewMessageBtn";
import API from "../../API";

export default class ChatList extends Component {
  constructor() {
    super();
    this.state = {
      chat: "",
    };
  }

  render() {
    const chats = this.props.chats.map((chat, index) => (
      <ShowChat
        friendName={this.findFriendName(chat.users)}
        message={this.findLastMessage(chat)}
        key={index}
        index={index}
        chat={chat}
        HandleSelectMessageClick={this.props.HandleSelectMessageClick}
      />
    ));

    return (
      <div>
        <NewMessageBtn
          HandleNewMessageBtnClick={this.props.HandleNewMessageBtnClick}
        />
        {chats}
      </div>
    );
  }
  findLastMessage = (chat) => {
    return chat.messages.length > 0 ? chat.messages[chat.messages.length - 1].content.substring(0, 15) + "..." : null;
  };
  findFriendName = (users) => {

    const friend = users.find((user) => user.id !== this.props.user.id);
    return friend.name;
  };
}
