import { Component } from "react";

import Input from "./Input";

export default class extends Component {
  constructor(props) {
    super(props); //this.props = props

    this.state = { status: "😊", type: "password" };
  }

  handleToggleClick = () =>
    this.setState({
      status: this.state.status === "😊" ? "😃" : "😊",
      type: this.state.type === "password" ? "text" : "password",
    });

  render() {
    return (
      <div className="w-full ml-4">
        <Input type={this.state.type} id={this.props.id} />
        <span
          style={{
            cursor: "pointer",
            position: "relative",
            right: "30px",
            fontSize: "16px",
          }}
          onClick={this.handleToggleClick}
        >
          {this.state.status}
          {/* lo que se muestra en el span */}
        </span>
      </div>
    );
  }
}
