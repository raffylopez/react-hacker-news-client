/*
 * Child.js
 * Copyright (C) 2020 volare <volare@CASSIOPEIA.local>
 *
 * Distributed under terms of the MIT license.
 */

import React, { Component } from 'react';
import styles from './SelectLanguage.css';

class SelectLanguage extends Component {

  constructor(props) {
    super(props);
  }



  render() {
    return (
      <div className={styles.base}>
      <button onClick={()=>{ this.props.onSelectLanguage("foobar"); }}>Click Me</button>
      </div>
    );
  }
}

export default SelectLanguage;
