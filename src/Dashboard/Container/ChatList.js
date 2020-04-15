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
  createChatList = () => {
    console.log(this.props.chats)
    // const chats = this.props.chats.chats.map((chat, index) => {
    //   return <ShowChat key={index} chat={chat} 
    //   message={this.findLastMessage(chat.messages)}/>
    // })
    // return chats 
  }

  render() {

    // const chats = this.props.chats.map((chat, index) =>
    //     <ShowChat
    //       friendName={this.findFriendName(chat.chatname)}
    //       message={this.findLastMessage(chat.messages)}
    //       key={index}
    //       index={index}
    //       chat={chat}
    //       HandleSelectMessageClick={this.props.HandleSelectMessageClick}
    //     />
    //   ) 
    return (
      <div>
        <NewMessageBtn
          HandleNewMessageBtnClick={this.props.HandleNewMessageBtnClick}
        />
        {this.createChatList()}
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
