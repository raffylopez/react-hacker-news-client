/*
 * Button.js
 * Copyright (C) 2020 volare <volare@CASSIOPEIA.local>
 *
 * Distributed under terms of the MIT license.
 */
import React, {Component, createRef} from 'react';
import PropTypes from 'prop-types';
import styles from './Button.css';

export default class Button extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  constructor(props) {
    super(props);
    console.log("[Button] contructor");
    this.buttonRef = React.createRef();
  }

  componentDidMount() {
    console.log("[Button] componentDidMount");
    throw new Error("Errrratic")
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log("[Button] shouldComponentUpdate");
    return true;
  }

  componentDidCatch(error, errorInfo) {
    console.log("[Button] ERROR!")
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("[Button] componentDidUpdate");
  }

  onClick = ()=>{
    this.props.onClickHandler(this.buttonRef.current.value)
  }
  render() {

    console.log("[Button] render");
    return (
      <div className={styles.base}>
        <button onClick={this.onClick} ref={this.buttonRef}>{this.props.label}</button>
      </div>
    );
  }
}
