import React, { Component } from "react";
import DropDownList from "./DropDownList";

export default class LearningRefs extends Component {
  constructor(props) {
    super(props);
  }

  onSelectHandler = (selectedItem) => {
    window.alert("[parent] "+ selectedItem);
  }

  render() {
    return (<div>
      <DropDownList onSelectHandler={this.onSelectHandler}/>
      </div>);
  }
}
