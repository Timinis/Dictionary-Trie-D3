import React, { Component, ChangeEvent } from 'react';
import { connect } from 'react-redux';
// import * as Actions from './GrapherAction';
import * as svgMounter from '../../../D3Mounter/D3Mounter.js';
import { Graph, isD3Source, isD3Target, Edge } from '../../../sharedTypes';
import nodeIMG from '../../assets/node.png';
import edgeIMG from '../../assets/edge.jpg';
import * as D3 from 'd3';
import * as TrieLibrary from '../../../DictionaryTrie/dictionaryTrie';
import NavBar from '../../Navbar/Navbar';

interface TrieState {
  search_suggestion: null | string[];
  trieGraph: null | Map<string, string[]>;
  d3node: any;
  d3link: any;
  d3text: any;
  d3Graph: any;
  simulation: any;
  drag: any;
}

class Examples extends Component<{}, TrieState> {
  myRef: React.RefObject<SVGSVGElement>;
  constructor(props: {}) {
    super(props);
    this.state = {
      search_suggestion: null,
      trieGraph: null,
      d3node: null,
      d3link: null,
      d3text: null,
      d3Graph: null,
      simulation: null,
      drag: null
    };
    this.myRef = React.createRef<SVGSVGElement>();
  }

  componentDidMount = () => {
    if (this.myRef.current === null) return;
    let copyNodes: Node[] = [];

    let copyEdges: Edge[] = [];

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

    let d3node = svgMounter.enterNode(
      d3Graph,
      copyNodes,
      '#5B8BDA',
      drag(simulation)
    );

    let d3link = svgMounter.enterLink(d3Graph, copyEdges);
    let d3text = svgMounter.enterText(d3Graph, copyNodes);
    this.setState({ d3node, d3text, d3link, d3Graph, drag, simulation });

    simulation.on('tick', () => {
      d3node.attr('cx', (d: any) => d.x).attr('cy', (d: any) => d.y);
      d3text.attr('x', (d: any) => d.x + 10).attr('dy', (d: any) => d.y);

      d3link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);
    });
  };

  handleChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    if (event.target.value.length > 3) {
      let selectedWords = TrieLibrary.searchWord(
        event.target.value.toLowerCase()
      );
      let trieGraph: Map<string, string[]> = TrieLibrary.createTrie(
        selectedWords
      );

      //enter d3code here
      let nodesList: any = [];
      let edgesList: any = [];

      trieGraph.forEach((value, key) => {
        nodesList.push({ id: key });
        value.forEach(element => {
          edgesList.push({
            source: key,
            value: 0.5,
            target: element
          });
        });
      });

      console.log(nodesList);
      console.log(edgesList);

      this.setState(
        {
          search_suggestion: selectedWords,
          trieGraph
        },
        () => {
          let copyNodes: Node[] = nodesList.map((element: any) => {
            return JSON.parse(JSON.stringify(element));
          });
          console.log(copyNodes);

          let copyEdges: Edge[] = edgesList.map((element: any) => {
            return JSON.parse(JSON.stringify(element));
          });
          let d3Graph = D3.select(this.myRef.current);
          let d3node = d3Graph.selectAll('.node');
          let d3text = d3Graph.selectAll('.desc');

          let d3link = d3Graph.selectAll('.link');
          let newGraphSelection = svgMounter.restartGraph(
            this.state.d3node,
            copyNodes,
            '#5B8BDA',
            this.state.drag(this.state.simulation),
            this.state.d3link,
            copyEdges,
            this.state.d3text,
            this.state.simulation
          );
          d3node = newGraphSelection.nodeSelection;
          d3text = newGraphSelection.textSelection;
          d3link = newGraphSelection.linkSelection;

          this.state.simulation.on('tick', () => {
            d3node.attr('cx', (d: any) => d.x).attr('cy', (d: any) => d.y);
            d3text.attr('x', (d: any) => d.x + 10).attr('dy', (d: any) => d.y);

            d3link
              .attr('x1', (d: any) => d.source.x)
              .attr('y1', (d: any) => d.source.y)
              .attr('x2', (d: any) => d.target.x)
              .attr('y2', (d: any) => d.target.y);
          });
          this.setState({ d3link, d3node, d3text });
        }
      );
    }
  };

  render() {
    return (
      <div>
        <NavBar />
        <svg ref={this.myRef} width="65vw" height="90vh" />
        <div className="controlPanel">
          <input
            type="text"
            name="search_suggestion"
            onChange={this.handleChange}
          />
          {this.state.search_suggestion ? (
            <ul>
              {this.state.search_suggestion.map((element, key) => {
                return <li key={key}>{element}</li>;
              })}
            </ul>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Examples;
