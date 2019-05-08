import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Grapher from './components/Grapher/Grapher';
import './reset.scss';

class App extends Component {
  componentDidMount() {
    document.title = 'Graphalizer';
  }

  render() {
    return (
      <HashRouter>
        <Route path="/" exact component={Home} />
        <Route path="/grapher" exact component={Grapher} />
      </HashRouter>
    );
  }
}

export default App;
