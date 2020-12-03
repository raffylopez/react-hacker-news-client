/*
 * App.js
 * Copyright (C) 2020 volare <volare@CASSIOPEIA.local>
 *
 * Distributed under terms of the MIT license.
 */

import React from "react";
import {BrowserRouter as Router} from 'react-router-dom';

import Parent from "./Parent";
import Child from "./Child";

const App = (props) => {
  return (
    <div>
      <Parent inheritance={"A Great Physique"}>
        <Child breed={"superior"}/>
        <Child/>
        <Child/>
        <Child/>
        <Child/>
        <Child breed={"superior"}/>
        <Child/>
      </Parent>
    </div>
  );
};

export default App;
