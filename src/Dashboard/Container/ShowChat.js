import React, { Component } from "react";
import ShowMessage from "../Components/ShowMessage";
import TypeMessageBox from "../Components/TypeMessageBox";
import API from "../../API";

export default class ShowChat extends Component {
  constructor() {
    super();
    this.state = {
      chatText: "",
    };
  }
  render() {
    const chats = this.props.chat.messages.map((message, index) => {
      return (
        <ShowMessage message={message} key={index} user={this.props.user} />
      );
    });
    return (
      <div className="DisplayMessages">
        <div className="Messages">{chats}</div>
        <TypeMessageBox
          typeMessage={this.typeMessage}
          onSubmitNewMessage={this.onSubmitNewMessage}
          chatText={this.state.chatText}
        />
      </div>
    );
  }
  typeMessage = (e) => {
    this.setState({ chatText: e.target.value });
  };
  onSubmitNewMessage = (e) => {
    API.post("messages", {
      content: this.state.chatText,
      user_id: this.props.user.id,
      chat_id: this.props.chat.id,
    });

    this.setState({ chatText: "" });
  };
}
