import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import EventSubscriber from './EventSubscriber';

const Router=()=>{
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={()=>{return <h1>Hello World</h1>}}/>
        <Route path="/event/:address" component={EventSubscriber}/>
      </Switch>
    </BrowserRouter>
  )
}

export default Router;