import React, { Component } from "react";
import ChatList from "./ChatList.js";
import ShowChat from "./ShowChat.js";
import NavBar from "../../NavBar/NavBar";
import NewMessage from "./NewMessage";
import API from "../../API";
import Cable from "actioncable";

class DashboardContainer extends Component {
  constructor() {
    super();

    this.state = {
      newMessage: false,
      selectedChat: null,
      NewMessageUsers: "",
      NewMessageUserId: null,
      NewMessageMessage: "",
      chats: null,
      // user: null,
      newChat_id: null,
    };

    this.chatsChannel = null;
    this.cable = null;
  }

  componentDidMount() {
    if (!this.props.user) {
      this.props.history.push("/");
    } else {
      API.getChats(localStorage.token).then((chats) => {
        this.setState({
          chats: chats,
        });
      });

      this.cable = Cable.createConsumer("ws://localhost:3000/cable");
      this.chatsChannel = this.cable.subscriptions.create(
        { channel: "ChatsChannel", chat_id: 1 },
        {
          received: (data) => console.log("cable says ", data),
        }
      );
    }
  }

  render() {
    return (
      <div className="Dashboard">
        <NavBar
          signOut={this.props.signOut}
          ResetNewMessageBack={this.ResetNewMessageBack}
        />
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
            {this.state.selectedChat !== null ? (
              <ShowChat
                cable={this.cable}
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

  HandleNewMessageSubmit = (e) => {
    e.preventDefault();

    // this.chatsChannel.perform("send_message", {
    //   chat: {
    //     hasRead: false,
    //   },
    //   user_id: this.props.user.id,
    //   email: this.state.NewMessageUsers,
    // });

    API.post("new_chat", {
      chat: {
        hasRead: false,
      },
      user_id: this.props.user.id,
      email: this.state.NewMessageUsers,
    });
    this.props.history.push("/home");
  };

  ResetNewMessageBack = () => {
    this.setState({
      NewMessageUsers: "",
    });
  };
  NewMessageTyping = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  NewMeesageFilterUser = () => {};
}

export default DashboardContainer;
