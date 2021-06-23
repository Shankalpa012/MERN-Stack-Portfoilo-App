import React, { Fragment } from 'react';
import { BrowserRouter as Router , Route, Switch } from "react-router-dom"
import Navabar from "./components/layout/Navabr"
import Landing from "./components/layout/Landing"
import Login from "./components/auth/Login"
import Alert from './components/layout/Alert';
import Register from "./components/auth/Register"
import './App.css';

//redux
import { Provider } from "react-redux";
import store from "./store"



const App = () => {
  return (
    <Provider store= {store}>
    <Router>
      <Fragment>
        <Navabar/>
        <Route exact path="/" component={Landing}/>

        <section className="container">
            <Alert/>
            <Switch>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/Register" component={Register}/>
            </Switch>
        </section>
        
      </Fragment>
    </Router>
    </Provider>
  );
}

export default App;
