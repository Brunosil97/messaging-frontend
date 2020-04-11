import React from "react";
import TextField from "@material-ui/core/TextField";
import Send from "@material-ui/icons/Send";

export default function TypeMessageBox({
  typeMessage,
  onSubmitNewMessage,
  chatText,
}) {
  return (
    <div className="TypeMessageBox">
      <TextField
        placeholder="new message"
        id="chatBox"
        className="MessageBoxEdit"
        onChange={typeMessage}
        value={chatText}
      ></TextField>
      <Send onClick={onSubmitNewMessage}></Send>
    </div>
  );
}
