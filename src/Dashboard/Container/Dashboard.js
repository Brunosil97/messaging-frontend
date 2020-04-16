import React, { Component } from "react";
import ChatList from "./ChatList.js";
import ShowChat from "./ShowChat.js";
import NavBar from "../../NavBar/NavBar";
import NewMessage from "./NewMessage";
import API from "../../API";

class DashboardContainer extends Component {
  state = {
    newMessage: false,
    selectedChat: "",
    NewMessageUsers: "",
    NewMessageUserId: null, 
    NewMessageMessage: "",
    chats: null,
    // user: null,
    newChat_id: null
  };

  componentDidMount() {
    if (!this.props.user) {
      this.props.history.push("/");
    } else {
      API.getChats(localStorage.token).then((chats) => {
        this.setState(
          {
            chats: chats
          },
        );
      });
    }
  }

  render() {
    return (
      <div className="Dashboard">
        <NavBar signOut={this.props.signOut} ResetNewMessageBack={this.ResetNewMessageBack} />
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
                user={this.props.user}
                HandleSelectMessageClick={this.HandleSelectMessageClick}
                HandleNewMessageBtnClick={this.HandleNewMessageBtnClick}
              />
            ) : null}
            {this.state.selectedChat !== "" ? (
              <ShowChat
                className="ShowChat"
                chat={this.state.selectedChat}
                user={this.props.user}
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
 
  HandleNewMessageSubmit = async (e) => {
    e.preventDefault()

    API.post("new_message", {
      chat: {
        hasRead: false
      },
      user_id: this.props.user.id,
      email: this.state.NewMessageUsers,
      content: this.state.NewMessageMessage
    })
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
