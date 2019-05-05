import React, { Component } from 'react';
import SvgBackground from './FrontPageBackground/frontPageBackground';
import './Home.scss';

class Home extends Component {
  render() {
    return (
      <div>
        <div className="landing">
          <h1>
            Graphalizer<span className="loader__dot">.</span>
            <span className="loader__dot">.</span>
            <span className="loader__dot">.</span>
          </h1>
          <h2>Data visualization learning tool</h2>
          <button>Get Started</button>
        </div>
        <SvgBackground />
      </div>
    );
  }
}

export default Home;
