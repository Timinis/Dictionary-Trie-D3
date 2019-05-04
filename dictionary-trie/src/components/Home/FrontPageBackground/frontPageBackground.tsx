import React, { Component } from 'react';
import svgMounter from './frontPageD3.js';

class SvgComponent extends Component {
  constructor(props: any) {
    super(props);
  }
  componentDidMount = () => {
    const nodesArray = [
      { id: 'a', group: '1' },
      { id: 'b', group: '1' },
      { id: 'c', group: '1' },
      { id: 'd', group: '2' }
    ];
    const edgesArray = [
      { source: 'a', value: 1, target: 'b' },
      { source: 'a', value: 1, target: 'c' },
      { source: 'b', value: 1, target: 'c' },
      { source: 'd', value: 1, target: 'b' }
    ];
    const svg = document.getElementById('directed-background');
    svgMounter(svg, nodesArray, edgesArray);
  };

  render() {
    return <svg id="directed-background" width="100vw" height="100vh" />;
  }
}

export default SvgComponent;
