import React, { Component, Fragment } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import store from './store'

import Header from './common/header'
import Home from './pages/home'
import Detail from './pages/detail/loadable.js'
import Login from './pages/login'
import Write from './pages/write'

class App extends Component {
  render() {
    return (
      <Provider store = {store}>
        <BrowserRouter>
          <Fragment>
            <Header /> 
            <Switch>
              <Route path="/home" component={Home}></Route>
              <Route path="/login" component={Login}></Route>
              <Route path="/detail/:id" component={Detail}></Route>
              <Route path="/write" component={Write}></Route>
            </Switch>
          </Fragment>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
