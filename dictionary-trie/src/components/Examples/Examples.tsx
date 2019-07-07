import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

class Examples extends Component<{}> {
  constructor(props: {}) {
    super(props);
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="example-list">
          <Link to="/examples/gdp">
            <img />
            <h1>GDP Bubble Chart</h1>
          </Link>
          <Link to="/examples/Trie">
            <img />
            <h1>Search Suggestion</h1>
          </Link>
        </div>
      </div>
    );
  }
}

export default Examples;
