import React, { Component } from 'react';

class Alert extends Component {
  constructor(props) {
    super(props);
    this.color = null;
    this.bgColor = null;
  }

  getStyle = () => {
    return {
      color: this.color,
      backgroundColor: this.bgColor,
      border: `2px solid ${this.color}`,
      fontSize: "12px",
      borderRadius: "7px",
      paddingLeft: "10px",
      paddingRight: "10px",
      paddingTop: "5px",
      paddingBottom: "5px",
      marginTop: "10px"
    };
  }

  render() {
    return (
      <div className="Alert">
        <p style={this.getStyle()}>{this.props.text}</p>
      </div>
    );
  }
}

class InfoAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'rgb(0, 0, 255)'; // blue
    this.bgColor = 'rgb(220, 220, 255)'; // light blue
  }
}

class ErrorAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'rgb(255, 0, 0)'; // red
    this.bgColor = 'rgb(255, 220, 220)'; // light red
  }
}

class WarningAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'rgb(255, 165, 0)'; // orange
    this.bgColor = 'rgb(255, 248, 220)'; // light orange
  }
}

export default Alert;
export { InfoAlert, ErrorAlert, WarningAlert };