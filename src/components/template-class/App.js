/*
 * App.js
 * Copyright (C) 2020 volare <volare@CASSIOPEIA.local>
 *
 * Distributed under terms of the MIT license.
 */

import React from "react";
import {BrowserRouter as Router} from 'react-router-dom';

import ComposingWithStyle from "../composing-with-style/ComposingWithStyle";

const App = (props) => {
  return (
    <div>
      <h1>It works!</h1>
      <ComposingWithStyle/>
    </div>
  );
};

export default App;
