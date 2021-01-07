import React from "react";
import styles from './app.module.css';
import Login from './components/login/login';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Maker from "./components/maker/maker";

function App( {FileInput ,authService} ) {
  return (
      <div className={styles.app}>
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Login authService={authService}/>
                </Route>
                <Route path="/maker">
                    <Maker FileInput={FileInput} authService={authService}/>
                </Route>
            </Switch>
        </BrowserRouter>
      </div>
  );
}

export default App;
