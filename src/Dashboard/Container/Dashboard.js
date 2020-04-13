import React, { Component } from "react";
import ChatList from "./ChatList.js";
import ShowChat from "./ShowChat.js";

class DashboardContainer extends Component {
  state = {
    selectedChat: "",
  };
  
  render() {
    return (
      <div>
        <div className="Chats">
          <ChatList
            className="ChatList"
            HandleSelectMessageClick={this.HandleSelectMessageClick}
          />
          {this.state.selectedChat !== "" ? (
            <ShowChat className="ShowChat" chat={this.state.selectedChat} />
          ) : null}
        </div>
      </div>
    );
  }
  HandleSelectMessageClick = (chat) => {
    this.setState({ selectedChat: chat });
  };
}

export default DashboardContainer;
