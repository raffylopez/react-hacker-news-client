/*
 * Main.js
 * Copyright (C) 2020 volare <volare@CASSIOPEIA.local>
 *
 * Distributed under terms of the MIT license.
 */
import React, { Component  } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import styles from './Main.css';
import ErrorBoundary from "./ErrorBoundary";

export default class Main extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  constructor(props) {
    console.log("contructor");
    super(props);
    this.state = {label: "Click it!!", hasError: false};
  }

  componentDidMount() {
    console.log("componentDidMount");
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("componentDidUpdate");
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log("shouldComponentUpdate");
    return true;
  }

  render() {
    console.log("render");
    return (
      <div className={styles.base}>
        <ErrorBoundary>
        <Button label={this.state.label} onClickHandler={(newLabel)=>{ this.setState({label: "Foobar"})}}/>
        </ErrorBoundary>
      </div>
    );
  }
}
