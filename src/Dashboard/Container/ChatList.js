import React, { Component } from "react";
import ShowChat from "../Components/ShowChats";
import Data from "../../database";
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
        // friendName={this.findFriendName(chat.users)}
        message={this.findLastMessage(chat.messages)}
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
  findLastMessage = (messages) => {
    console.log(messages);
    return messages[messages.length - 1].content.substring(0, 15) + "...";
  };
  findFriendName = (users) => {
    const friend = users.filter((user) => user.email !== this.props.user);
    return friend[0].name;
  };
}
