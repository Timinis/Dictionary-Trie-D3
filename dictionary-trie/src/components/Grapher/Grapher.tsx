import React, { Component, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import * as Actions from './GrapherAction';
import * as svgMounter from '../../D3Mounter/D3Mounter';
import { Graph, isD3Source, isD3Target } from '../../sharedTypes';

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
      edge_list_visibility: false
    };
  }

  componentWillReceiveProps(props: GrapherProps) {}

  componentDidMount = () => {
    const svg = document.getElementById('grapher');

    svgMounter.initializer(
      svg,
      this.props.graph.nodesArray,
      this.props.graph.edgesArray,
      true
    );
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
    //nodeListVis = (event: Event) => {
    event.preventDefault();
    if (!this.state.node_list_visibility) {
      this.setState({ node_list_visibility: true });
    } else {
      this.setState({ node_list_visibility: false });
    }
  };

  nodeFormVis = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    this.setState({ node_form_visibility: true });
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
    this.setState({ edge_form_visibility: true });
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
    }
    if (uniqueId.has(this.state.node_id)) {
      this.setState({
        node_id_message: 'ID already taken, please set a new ID'
      });
    }
    if (this.state.node_id.length > 0 && !uniqueId.has(this.state.node_id)) {
      let postData = { id: this.state.node_id };
      this.props.addNode(postData);
      setTimeout(() => {
        console.log(this.props.graph.nodesArray);
        svgMounter.updater(
          this.props.graph.nodesArray,
          this.props.graph.edgesArray
        );
      }, 2);
      this.setState({ node_form_visibility: false });
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
      console.log(postData);
      this.props.addEdge(postData);
      setTimeout(() => {
        svgMounter.updater(
          this.props.graph.nodesArray,
          this.props.graph.edgesArray
        );
      }, 2);
      this.setState({ edge_form_visibility: false });
    }
  };

  render() {
    return (
      <div>
        <div className="nodeArea">
          <h1>Nodes</h1>
          <button onClick={event => this.nodeListVis(event)}>
            {this.state.node_list_visibility ? 'Hide' : 'Expand'}
          </button>

          {this.state.node_list_visibility ? (
            <ul>
              {this.props.graph.nodesArray.map((element, index) => {
                return <li key={index}>Node: {element.id}</li>;
              })}
            </ul>
          ) : null}

          <button onClick={this.nodeFormVis}>+</button>
          {this.state.node_form_visibility ? (
            <form>
              <label htmlFor="node_id">Node</label>
              <input type="text" name="node_id" onChange={this.handleChange} />

              <p>{this.state.node_id_message}</p>
              <button type="submit" onClick={this.handleNodeSubmit}>
                Create Node
              </button>
            </form>
          ) : null}
        </div>
        <div className="edgeArea">
          <h1>Edges</h1>
          <button onClick={this.edgeListVis}>
            {this.state.edge_list_visibility ? 'Hide' : 'Expand'}
          </button>
          {this.state.edge_list_visibility ? (
            <div className="edgeList">
              {this.props.graph.edgesArray.map((element, index) => {
                return (
                  <div key={index}>
                    {isD3Source(element.source) &&
                    isD3Target(element.target) ? (
                      <>
                        <h2>Source Node: {element.source.id}</h2>
                        <h2>Weight:{element.value}</h2>
                        <h2>Target Node: {element.target.id}</h2>
                      </>
                    ) : null}
                  </div>
                );
              })}
              }
            </div>
          ) : null}

          <button onClick={this.edgeFormVis}>+</button>
          {this.state.edge_form_visibility ? (
            <form>
              <label htmlFor="edge_source">Source Node</label>
              <select name="edge_source" onChange={this.handleChange}>
                <option value="">Node Source</option>
                {this.props.graph.nodesArray.map((element, index) => {
                  return isD3Target(element) ? (
                    <option value={element.id} key={index}>
                      {element.id}
                    </option>
                  ) : null;
                })}
              </select>
              <p>{this.state.edge_source_message}</p>

              <label htmlFor="edge_weight">Edge Weight</label>
              <input
                type="number"
                name="edge_weight"
                min="0"
                onChange={this.handleChange}
              />
              <p>{this.state.edge_weight_message}</p>
              <label htmlFor="edge_target">Target Node</label>
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

        <svg id="grapher" width="60vw" height="100vh" />
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
