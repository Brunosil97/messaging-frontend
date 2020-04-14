import React, { Component } from "react";
import ShowChat from "../Components/ShowChats";
import Data from "../../database";
import NewMessageBtn from "../Components/NewMessageBtn";


export default class ChatList extends Component {

  // constructor() {
  //   super()
  //   this.state = {
  //     chats: []
  //   }
  // }

  render() {

    // const chats = Data.chats.map((chat, index) =>
    //   chat.chatname.includes("test1@gmail.com") ? (
    //     <ShowChat
    //       friendName={this.findFriendName(chat.chatname)}
    //       message={this.findLastMessage(chat.messages)}
    //       key={index}
    //       index={index}
    //       chat={chat}
    //       HandleSelectMessageClick={this.props.HandleSelectMessageClick}
    //     />
    //   ) : null
    // );
    return (
      <div>
        <NewMessageBtn
          HandleNewMessageBtnClick={this.props.HandleNewMessageBtnClick}
        />
        {this.props.chats}
      </div>
    );
  }
  findLastMessage = (messages) => {
    console.log(messages);
    return messages[messages.length - 1].content.substring(0, 15) + "...";
  };
  findFriendName = (chatname) => {
    const names = chatname.split(" : ");
    return names.find((name) => name !== "test1@gmail.com");
  };
}
