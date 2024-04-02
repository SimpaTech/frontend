import React, { Component } from 'react';
import "../styles/Header.css"

type Props = {
  title: string;
  username: string;
};

type State = {};

export default class Header extends Component<Props, State> {
  state = {};

  render() {
    return (
      <div className="d-flex justify-content-between align-items-center px-5 p-2 header">
        <div>{this.props.title}</div>
        <div>{this.props.username}</div>
      </div>
    );
  }
  
}