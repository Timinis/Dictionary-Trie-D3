import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import './reset.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // What kind of inital state to we need?
    };
  }

  componentDidMount() {
    document.title = 'Timothy Li- Interactive Media';
  }

  render() {
    return (
      <HashRouter>
        <div>
          <Route path="/" exact component={Home} />
        </div>
      </HashRouter>
    );
  }
}

export default App;
