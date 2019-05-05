import React, { Component } from 'react';
import svgMounter from './frontPageD3.js';

class SvgComponent extends Component {
  componentDidMount = () => {
    let nodesArray = [{ id: 'a' }, { id: 'b' }, { id: 'c' }, { id: 'd' }];
    let edgesArray = [
      { source: 'a', value: 1, target: 'b' },
      { source: 'a', value: 1, target: 'c' },
      { source: 'b', value: 1, target: 'c' },
      { source: 'd', value: 1, target: 'b' }
    ];
    const svg = document.getElementById('directed-background');
    svgMounter(svg, nodesArray, edgesArray, false);
  };

  render() {
    return <svg id="directed-background" width="100vw" height="100vh" />;
  }
}

export default SvgComponent;
