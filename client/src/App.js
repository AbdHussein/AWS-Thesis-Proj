import React from 'react';
import './App.scss';
import {
  BrowserRouter as Router, Switch, Route
} from "react-router-dom";
import Landing from './components/landing/landing';
import Map from './components/mainMap/map';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route path='/map' component={Map} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
