import React, { Component } from 'react';
import SvgBackground from './FrontPageBackground/frontPageBackground';
import './Home.scss';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { text: 'Data visualization learning tool' };
  }
  onHover = event => {
    this.setState({ text: 'Drag on the nodes' });
  };
  mouseOut = event => {
    this.setState({ text: 'Data visualization learning tool' });
  };

  render() {
    return (
      <div>
        <div className="landing">
          <h1>
            Graphalizer<span className="loader__dot">.</span>
            <span className="loader__dot">.</span>
            <span className="loader__dot">.</span>
          </h1>
          <h2 onMouseEnter={this.onHover} onMouseLeave={this.mouseOut}>
            {this.state.text}
          </h2>
          <button>Get Started</button>
        </div>
        <SvgBackground />
      </div>
    );
  }
}

export default Home;
