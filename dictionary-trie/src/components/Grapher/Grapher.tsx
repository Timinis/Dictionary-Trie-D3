import React, { Component, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import * as Actions from './GrapherAction';
import * as svgMounter from '../../D3Mounter/D3Mounter.js';
import { Graph, isD3Source, isD3Target, Edge } from '../../sharedTypes';
import nodeIMG from '../../assets/node.png';
import edgeIMG from '../../assets/edge.jpg';
import * as D3 from 'd3';
import NavBar from '../Navbar/Navbar';

import './Grapher.scss';

interface GrapherState {
  node_id: string;
  node_id_message: string;
  edge_source: string;
  edge_source_message: string;
  edge_weight: number;
  edge_weight_message: string;
  edge_target: string;
  edge_target_message: string;
  node_form_visibility: boolean;
  node_list_visibility: boolean;
  edge_form_visibility: boolean;
  edge_list_visibility: boolean;
  d3node: any;
  d3link: any;
  d3text: any;
  d3Graph: any;
  simulation: any;
  drag: any;
}

interface GrapherStateProps {
  graph: Graph;
}
interface GrapherDispatchProps {
  addNode: (postdata: { id: string }) => void;
  addEdge: (postdata: {
    source: string;
    value: number;
    target: string;
  }) => void;
}
type GrapherProps = GrapherStateProps & GrapherDispatchProps;

class Grapher extends Component<GrapherProps, GrapherState> {
  myRef: React.RefObject<SVGSVGElement>;
  constructor(props: GrapherProps) {
    super(props);
    this.state = {
      node_id: '',
      node_id_message: '',
      edge_source: '',
      edge_source_message: '',
      edge_weight: 0,
      edge_weight_message: '',
      edge_target: '',
      edge_target_message: '',
      node_form_visibility: false,
      node_list_visibility: false,
      edge_form_visibility: false,
      edge_list_visibility: false,
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
    let copyNodes: Node[] = this.props.graph.nodesArray.map(element => {
      return JSON.parse(JSON.stringify(element));
    });

    let copyEdges: Edge[] = this.props.graph.edgesArray.map(element => {
      return JSON.parse(JSON.stringify(element));
    });

    let d3Graph = D3.select(this.myRef.current);
    console.log(d3Graph);
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
    if (event.target !== null) {
      const { name, value } = event.target;
      this.setState({
        [name]: value
      } as any);
    }
  };

  nodeListVis = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    if (!this.state.node_list_visibility) {
      this.setState({ node_list_visibility: true });
    } else {
      this.setState({ node_list_visibility: false });
    }
  };

  nodeFormVis = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    if (!this.state.node_form_visibility) {
      this.setState({ node_form_visibility: true });
    } else {
      this.setState({ node_form_visibility: false });
    }
  };

  edgeListVis = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    if (!this.state.edge_list_visibility) {
      this.setState({ edge_list_visibility: true });
    } else {
      this.setState({ edge_list_visibility: false });
    }
  };

  edgeFormVis = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    if (!this.state.edge_form_visibility) {
      this.setState({ edge_form_visibility: true });
    } else {
      this.setState({ edge_form_visibility: false });
    }
  };

  handleNodeSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const reducerData = this.props.graph.nodesArray;
    let uniqueId = new Set();
    reducerData.forEach(element => {
      uniqueId.add(element.id);
    });

    event.preventDefault();
    this.setState({
      node_id_message: ''
    });
    if (this.state.node_id.length <= 0) {
      this.setState({
        node_id_message: 'Empty field, please enter information'
      });
    } else if (uniqueId.has(this.state.node_id)) {
      this.setState({
        node_id_message: 'Name already taken, please set a new ID'
      });
    } else if (
      this.state.node_id.length > 0 &&
      !uniqueId.has(this.state.node_id)
    ) {
      let postData = { id: this.state.node_id };
      this.props.addNode(postData);

      this.setState({ node_form_visibility: false }, () => {
        let copyNodes: Node[] = this.props.graph.nodesArray.map(element => {
          return JSON.parse(JSON.stringify(element));
        });

        let copyEdges: Edge[] = this.props.graph.edgesArray.map(element => {
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
      });
    }
  };

  handleEdgeSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    console.log('clicked');
    this.setState({
      edge_source_message: '',
      edge_target_message: '',
      edge_weight_message: ''
    });
    if (this.state.edge_source.length <= 0) {
      this.setState({
        edge_source_message:
          'Please select a source node or create a node first'
      });
    }
    if (this.state.edge_weight <= 0) {
      this.setState({
        edge_weight_message: 'Please enter a weight for the edge'
      });
    }
    if (this.state.edge_target.length <= 0) {
      this.setState({
        edge_target_message:
          'Please select a target node or create a node first'
      });
    }
    if (
      this.state.edge_source.length > 0 &&
      this.state.edge_weight > 0 &&
      this.state.edge_target.length > 0
    ) {
      let postData = {
        source: this.state.edge_source,
        value: this.state.edge_weight,
        target: this.state.edge_target
      };

      this.props.addEdge(postData);

      this.setState({ edge_form_visibility: false }, () => {
        let copyNodes: Node[] = this.props.graph.nodesArray.map(element => {
          return JSON.parse(JSON.stringify(element));
        });

        let copyEdges: Edge[] = this.props.graph.edgesArray.map(element => {
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
        console.log(d3link);
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
      });
    }
  };

  render() {
    console.log(this.props.graph.edgesArray);
    return (
      <div>
        <NavBar />

        <svg ref={this.myRef} width="65vw" height="90vh" />
        <div className="controlPanel">
          <div className="nodeArea">
            <h1>nodes</h1>
            <button onClick={event => this.nodeListVis(event)}>
              {this.state.node_list_visibility ? 'hide list' : 'expand list'}
            </button>
            <button onClick={this.nodeFormVis}>add a node</button>
            {this.state.node_list_visibility ? (
              <ul>
                {this.props.graph.nodesArray.map((element, index) => {
                  return (
                    <div className="list-cards">
                      <img src={nodeIMG} />
                      <li key={index}>node {element.id}</li>
                    </div>
                  );
                })}
              </ul>
            ) : null}

            {this.state.node_form_visibility ? (
              <form>
                <label htmlFor="node_id">node name</label>
                <input
                  type="text"
                  name="node_id"
                  onChange={this.handleChange}
                />

                <p>{this.state.node_id_message}</p>
                <button type="submit" onClick={this.handleNodeSubmit}>
                  create node
                </button>
              </form>
            ) : null}
          </div>
          <div className="edgeArea">
            <h1>edges</h1>
            <button onClick={this.edgeListVis}>
              {this.state.edge_list_visibility ? 'hide list' : 'expand list'}
            </button>
            <button onClick={this.edgeFormVis}>add edge</button>
            {this.state.edge_list_visibility ? (
              <div className="edgeList">
                {this.props.graph.edgesArray.map((element, index) => {
                  return (
                    <div key={index} className="edge-list">
                      <img src={edgeIMG} />
                      <div className="edge-info">
                        <h2>source node: {element.source}</h2>
                        <h2>weight of edge:{element.value}</h2>
                        <h2>target node: {element.target}</h2>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : null}

            {this.state.edge_form_visibility ? (
              <form>
                <label htmlFor="edge_source">source node</label>
                <select name="edge_source" onChange={this.handleChange}>
                  <option value="">Source Node</option>
                  {this.props.graph.nodesArray.map((element, index) => {
                    return isD3Target(element) ? (
                      <option value={element.id} key={index}>
                        {element.id}
                      </option>
                    ) : null;
                  })}
                </select>
                <p>{this.state.edge_source_message}</p>

                <label htmlFor="edge_weight">edge length</label>
                <input
                  type="number"
                  name="edge_weight"
                  min="0"
                  onChange={this.handleChange}
                />
                <p>{this.state.edge_weight_message}</p>
                <label htmlFor="edge_target">target node</label>
                <select name="edge_target" onChange={this.handleChange}>
                  <option value="">Node Target</option>
                  {this.props.graph.nodesArray.map((element, index) => {
                    return isD3Target(element) ? (
                      <option value={element.id} key={index}>
                        {element.id}
                      </option>
                    ) : null;
                  })}
                </select>
                <p>{this.state.edge_target_message}</p>
                <button type="submit" onClick={this.handleEdgeSubmit}>
                  Create Edge
                </button>
              </form>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (reducerState: Graph): GrapherStateProps => ({
  graph: reducerState
});

const mapDispatchToProps = (dispatch: any): GrapherDispatchProps => ({
  addNode: newNode => dispatch(Actions.nodeAdder(newNode)),
  addEdge: newEdge => dispatch(Actions.edgeAdder(newEdge))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Grapher);
