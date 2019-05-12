import React, { Component, ReactSVGElement } from 'react';
import * as D3 from 'd3';
import './Navbar.scss';
import { ClusterNode, Node } from '../../sharedTypes';
import { Link } from 'react-router-dom';

class NavBar extends Component<{}, { intervalId: number; d3Timer?: D3.Timer }> {
  myRef: React.RefObject<SVGSVGElement>;
  constructor(props: {}) {
    super(props);
    this.state = { intervalId: -1 };
    this.myRef = React.createRef<SVGSVGElement>();
  }
  componentDidMount = () => {
    if (!this.myRef.current) return;
    let nodesArray: ClusterNode[] = [{ id: 'a', radius: 25, color: '#f8f8ff' }];

    for (let i = 0; i < 50; i++) {
      nodesArray.push({
        id: Math.random().toString(),
        radius: Math.floor(Math.random() * 8),
        color: '#' + ((Math.random() * 0xffffff) << 0).toString(16)
      });
    }

    console.log(nodesArray);

    let copyNodes: Node[] = nodesArray.map(element => {
      return JSON.parse(JSON.stringify(element));
    });

    let d3Graph = D3.select(this.myRef.current);
    let width = this.myRef.current.width.baseVal.value;
    let height = this.myRef.current.height.baseVal.value;

    const simulation = D3.forceSimulation(copyNodes)
      .force('charge', D3.forceManyBody().strength(2))
      .force('center', D3.forceCenter(width / 2, height / 2))
      .force('collision', D3.forceCollide().radius((d: any) => d.radius));
    const drag = (simulation: any): any => {
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

    let node = d3Graph
      .classed('forceNode', true)
      .append('g')
      .attr('stroke', '#f8f8ff')
      .attr('stroke-width', 1.5)
      .selectAll('circle')
      .data(copyNodes)
      .join('circle')
      .attr('r', (d: any) => d.radius)
      .style('fill', (d: any) => d.color)
      .call(drag(simulation));

    simulation.on('tick', () => {
      node.attr('cx', (d: any) => d.x).attr('cy', (d: any) => d.y);
    });
  };

  render() {
    return (
      <div className="navbar">
        <Link to="/">
          <h1>
            Graphalizer<span className="loader__dot">.</span>
            <span className="loader__dot">.</span>
            <span className="loader__dot">.</span>
          </h1>
        </Link>
        <svg ref={this.myRef} width="15vw" height="10vh" className="navsvg">
          <rect width="100%" height="100%" fill="#f8f8ff" />
        </svg>
      </div>
    );
  }
}

export default NavBar;
