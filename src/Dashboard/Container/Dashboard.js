import React, { Component } from "react";
import ChatList from "./ChatList.js";
import ShowChat from "./ShowChat.js";
import NavBar from "../../NavBar/NavBar";
import NewMessage from "./NewMessage";
import API from '../../API'

class DashboardContainer extends Component {
  state = {
    newMessage: false,
    selectedChat: "",
    NewMessageUsers: "",
    NewMessageMessage: "",
    chats: []
  };

  componentDidMount() {
    if(!this.props.email) {
      this.props.history.push("/")
    } else {
      API.getChats(localStorage.token)
      .then(json => {
        this.setState({
        chats: json
      }, () => console.log(this.state.chats)
      )})
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
            <ChatList
              className="ChatList"
              chats={this.state.chats}
              HandleSelectMessageClick={this.HandleSelectMessageClick}
              HandleNewMessageBtnClick={this.HandleNewMessageBtnClick}
            />
            {this.state.selectedChat !== "" ? (
              <ShowChat className="ShowChat" chat={this.state.selectedChat} />
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
