import React, { Component } from "react";
import ChatList from "./ChatList.js";
import ShowChat from "./ShowChat.js";
import NavBar from "../../NavBar/NavBar";
import API from "../../API";
import Cable from "actioncable";

class DashboardContainer extends Component {
  constructor() {
    super();

    this.state = {
      selectedChat: null,
      NewMessageUsers: "",
      NewMessageUserId: null,
      NewMessageMessage: "",
      chats: null,
      newChat_id: null,
    };

    this.chatsChannel = null;
    this.cable = null;
  }

  componentDidMount() {
    if (!this.props.user) {
      this.props.history.push("/");
    } 
    else {
      API.getChats(localStorage.token).then((chats) => {
        this.setState({
          chats: chats,
        });
      });
      this.cable = Cable.createConsumer("ws://localhost:3000/cable");
    }
  }

  HandleSelectMessageClick = async (chat) => {
    await this.setState({ selectedChat: null });
    this.setState({ selectedChat: chat });
  };
 
  handleSubmitNewMessage =() => {
    API.getChats(localStorage.token).then((chats) => {
      this.setState({
        chats: chats,
      });
    });
  }


  render() {
    return (
      <div className="Dashboard">
        <NavBar
          signOut={this.props.signOut}
          ResetNewMessageBack={this.ResetNewMessageBack}
        />
          <div className="Chats">
            {this.state.chats ? (
              <ChatList
                history={this.props.history}
                className="ChatList"
                chats={this.state.chats}
                user={this.props.user}
                HandleSelectMessageClick={this.HandleSelectMessageClick}
              />
            ) : null}
            {this.state.selectedChat !== null ? (
              <ShowChat
                cable={this.cable}
                className="ShowChat"
                chat={this.state.selectedChat}
                user={this.props.user}
                handleSubmitNewMessage={this.handleSubmitNewMessage}
              />
            ) : null}
          </div>
      </div>
    );
  }
}

export default DashboardContainer;
