/*
 * Displayer.js
 * Copyright (C) 2020 volare <volare@CASSIOPEIA.local>
 *
 * Distributed under terms of the MIT license.
 */
import React, { Component  } from 'react';

export default class Displayer extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  actionHandler = ()=> {}

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
  }

  componentWillUnmount() {
  }

  render() {
    return (<div className={'cool_button'}>Awesome!</div>);
  }
}
