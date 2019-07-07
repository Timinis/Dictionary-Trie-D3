import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Grapher from './components/Grapher/Grapher';
import Examples from './components/Examples/Examples';
import GDP from './components/Examples/GDP/GDP';
import Trie from './components/Examples/Trie/Trie';

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
        <Route path="/examples" exact component={Examples} />
        <Route path="/examples/gdp" exact component={GDP} />
        <Route path="/examples/trie" exact component={Trie} />
      </HashRouter>
    );
  }
}

export default App;
