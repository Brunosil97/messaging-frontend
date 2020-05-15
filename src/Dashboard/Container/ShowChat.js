import React, { Component } from "react";
import ShowMessage from "../Components/ShowMessage";
import TypeMessageBox from "../Components/TypeMessageBox";
import API from "../../API";
import Cable from "actioncable";

export default class ShowChat extends Component {
  constructor(props) {
    super();
    this.state = {
      chatText: "",
      messages: props.chat.messages
    };
  }
  componentDidMount() {
    this.messagesChannel = this.props.cable.subscriptions.create(
      { channel: "MessagesChannel", chat_id: this.props.chat.id },
      {
        received: (data) =>{ 
          this.setState({ messages: [...this.state.messages, data] })
          this.props.handleSubmitNewMessage()
        }
      }
    );
  }

  componentWillUnmount() {
    this.props.cable.subscriptions.remove(this.messagesChannel);
  }

  render() {
    const chats = this.state.messages.length > 0 ? this.state.messages.map((message, index) => {
      return (
        <ShowMessage message={message} key={index} user={this.props.user} />
      );
    }) : null;

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
    this.messagesChannel.perform("send_message_to_user", {
      content: this.state.chatText,
      user_id: this.props.user.id,
      chat_id: this.props.chat.id,
    });

    this.setState({ chatText: "" });
  };
}
