/*
 * DropDownList.js
 * Copyright (C) 2020 volare <volare@CASSIOPEIA.local>
 *
 * Distributed under terms of the MIT license.
 */

import React, { Component } from 'react';
import styles from './DropDownList.css';

class DropDownList extends Component {

  constructor(props) {
    super(props);
    this.dropdown = React.createRef();
    this.buttonRef = React.createRef();
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(obj) {
    this.props.onSelectHandler(obj.target.value);
  }

  handleSelectRef = ()=> {
    console.log(this.dropdown.current)
    this.props.onSelectHandler(this.dropdown.current.value);
  }

  onClick = ()=> {
    alert(this.buttonRef.current.textContent);
  }

  render() {
    return (
      <div className={styles.base}>
      <select className="dropdown" onChange={this.handleSelectRef} ref={this.dropdown}>
        <option value="foo">Foo</option>
        <option value="bar">Bar</option>
        <option value="baz">Baz</option>
      </select>
      <button className="cool_button" ref={this.buttonRef} onClick={this.onClick}>Click Me</button>
      </div>
    );
  }
}

export default DropDownList;
