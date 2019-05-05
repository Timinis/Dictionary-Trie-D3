import React, { Component } from 'react';
import * as svgMounter from '../../../D3Mounter/D3Mounter';

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
    svgMounter.initializer(svg, nodesArray, edgesArray, false);

    setInterval(() => {
      if (nodesArray.length < 15) {
        let randomGenerated = Math.random().toString();
        let randomTarget = Math.floor(Math.random() * nodesArray.length) - 1;
        if (randomTarget === -1) {
          randomTarget = 0;
        }
        let otherRandom = Math.floor(Math.random() * nodesArray.length) - 1;
        if (otherRandom === -1) {
          otherRandom = 0;
        }
        nodesArray = [...nodesArray, { id: randomGenerated }];
        edgesArray = [
          ...edgesArray,
          {
            source: randomGenerated,
            value: 1,
            target: nodesArray[randomTarget].id
          }
        ];
        edgesArray = [
          ...edgesArray,
          {
            source: nodesArray[otherRandom].id,
            value: 1,
            target: nodesArray[randomTarget].id
          }
        ];
        svgMounter.updater(nodesArray, edgesArray);
      }
    }, 2000);
  };

  render() {
    return <svg id="directed-background" width="100vw" height="100vh" />;
  }
}

export default SvgComponent;
