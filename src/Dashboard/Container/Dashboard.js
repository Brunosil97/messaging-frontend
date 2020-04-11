import React, { Component } from "react";
import Data from "../../database";

class DashboardContainer extends Component {
  state = {};
  render() {
    console.log(Data);
    return <div>Hello from dashboard</div>;
  }
}

export default DashboardContainer;
