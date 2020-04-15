import React, { Component } from "react";
import ChatList from "./ChatList.js";
import ShowChat from "./ShowChat.js";
import NavBar from "../../NavBar/NavBar";
import NewMessage from "./NewMessage";
import API from "../../API";

function parseJwt(token) {
  if (!token) {
    return;
  }
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
}

class DashboardContainer extends Component {
  state = {
    newMessage: false,
    selectedChat: "",
    NewMessageUsers: "",
    NewMessageMessage: "",
    chats: null,
    user: null,
  };

  componentDidMount() {
    if (!this.props.email) {
      this.props.history.push("/");
    } else {
      API.getChats(localStorage.token).then((json) => {
        this.setState(
          {
            chats: json,
          },
          () => console.log(this.state.chats)
        );
      });
      const userId = parseJwt(localStorage.token);
      console.log(userId);
      API.getFetch(`users/${parseJwt(localStorage.token).id}`).then((res) =>
        this.setState({ user: res })
      );
    }
  }

  render() {
    return (
      <div className="Dashboard">
        <NavBar ResetNewMessageBack={this.ResetNewMessageBack} />
        {this.state.newMessage ? (
          <NewMessage
            HandleNewMessageSubmit={this.HandleNewMessageSubmit}
            HandleNewMessageBack={this.ResetNewMessageBack}
            NewMessageTyping={this.NewMessageTyping}
          />
        ) : (
          <div className="Chats">
            {this.state.chats ? (
              <ChatList
                className="ChatList"
                chats={this.state.chats}
                user={this.props.email}
                HandleSelectMessageClick={this.HandleSelectMessageClick}
                HandleNewMessageBtnClick={this.HandleNewMessageBtnClick}
              />
            ) : null}
            {this.state.selectedChat !== "" ? (
              <ShowChat
                className="ShowChat"
                chat={this.state.selectedChat}
                user={this.state.user}
              />
            ) : null}
          </div>
        )}
      </div>
    );
  }
  HandleSelectMessageClick = (chat) => {
    this.setState({ selectedChat: chat });
  };
  HandleNewMessageBtnClick = () => {
    this.setState({ newMessage: !this.state.newMessage });
  };
  HandleNewMessageSubmit = (e) => {
    console.log(e.target);
    this.setState({
      newMessage: false,
      NewMessageUsers: "",
      NewMessageMessage: "",
    });
  };
  ResetNewMessageBack = () => {
    this.setState({
      newMessage: false,
      NewMessageUsers: "",
      NewMessageMessage: "",
    });
  };
  NewMessageTyping = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  NewMeesageFilterUser = () => {};
}

export default DashboardContainer;
