import React, { Component, ReactSVGElement } from 'react';
import * as D3 from 'd3';
import * as svgMounter from '../../../D3Mounter/D3Mounter.js';
import { Node, Edge } from '../../../sharedTypes';

class SvgComponent extends Component<
  {},
  { intervalId: number; d3Timer?: D3.Timer }
> {
  myRef: React.RefObject<SVGSVGElement>;
  constructor(props: {}) {
    super(props);
    this.state = { intervalId: -1 };
    this.myRef = React.createRef<SVGSVGElement>();
  }
  componentDidMount = () => {
    if (!this.myRef.current) return;
    let nodesArray: Node[] = [
      { id: 'a' },
      { id: 'b' },
      { id: 'c' },
      { id: 'd' }
    ];
    let edgesArray: Edge[] = [
      { source: 'a', value: 1, target: 'b' },
      { source: 'a', value: 1, target: 'c' },
      { source: 'b', value: 1, target: 'c' },
      { source: 'd', value: 1, target: 'b' }
    ];

    let copyNodes: Node[] = nodesArray.map(element => {
      return JSON.parse(JSON.stringify(element));
    });

    let copyEdges: Edge[] = edgesArray.map(element => {
      return JSON.parse(JSON.stringify(element));
    });

    let d3Graph = D3.select(this.myRef.current);
    let width = this.myRef.current.width.baseVal.value;
    let height = this.myRef.current.height.baseVal.value;

    const simulation = svgMounter.simulationCreator(
      copyNodes,
      copyEdges,
      height,
      width
    );

    const drag = (simulation: any) => {
      const dragstarted = (d: any) => {
        if (!D3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      };

      const dragged = (d: any) => {
        d.fx = D3.event.x;
        d.fy = D3.event.y;
      };

      const dragended = (d: any) => {
        if (!D3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      };

      return D3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);
    };

    let node = svgMounter.enterNode(
      d3Graph,
      copyNodes,
      '#5B8BDA',
      drag(simulation)
    );

    let link = svgMounter.enterLink(d3Graph, copyEdges);

    simulation.on('tick', () => {
      node.attr('cx', (d: any) => d.x).attr('cy', (d: any) => d.y);

      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);
    });

    const intervalId = window.setInterval(() => {
      if (nodesArray.length < 8) {
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

        copyNodes = nodesArray.map(element => {
          return JSON.parse(JSON.stringify(element));
        });

        copyEdges = edgesArray.map(element => {
          return JSON.parse(JSON.stringify(element));
        });

        let newGraph = svgMounter.restartGraph(
          node,
          copyNodes,
          '#5B8BDA',
          drag(simulation),
          link,
          copyEdges,
          null,
          simulation
        );
        node = newGraph.nodeSelection;
        link = newGraph.linkSelection;
      }
    }, 2000);

    this.setState({ intervalId });
  };

  render() {
    return <svg ref={this.myRef} width="100vw" height="100vh" />;
  }

  componentWillUnmount() {
    if (this.state.intervalId) {
      window.clearInterval(this.state.intervalId);
    }
    if (this.state.d3Timer) {
      this.state.d3Timer.stop();
    }
  }
}

export default SvgComponent;
