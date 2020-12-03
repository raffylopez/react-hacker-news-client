/*
 * App.js
 * Copyright (C) 2020 volare <volare@CASSIOPEIA.local>
 *
 * Distributed under terms of the MIT license.
 */

import React from "react";

import Parent from "./Parent";
import Child from "./Child";
import Displayer from './Displayer';

import {Route, Link} from 'react-router-dom';
const App = (props) => {
  return (
      <div>

        <Parent inheritance={"A Great Physique"}>
          <Link to="/">Foobar</Link><br/>
          <Link to="/foo/1">Foobar</Link><br/>
          <Link to="/foo/123">Foobar</Link>
          <Link to="/bar">Bar</Link>
          <Child breed={"superior"}/>
          <Child/>
          <Child/>
          <Child/>
          <Child/>
          <Child breed={"superior"}/>
          <Child/>
        </Parent>
        <Route exact path="/" component={Main}/>
        <Route path="/foo/:fooId" component={Foo}/>
        <Route path="/bar" component={Bar}/>

      </div>
  );
};

const Foo = ({match}) => (
  <div>{match.params.fooId}Foo</div>
)

const Bar = ({match}) => (
  <div>{match.params.fooId}Bar</div>
)

const Main = ({match}) => (
  <div><h1>{match.params.fooId}Welcome!</h1></div>
)


export default App;
