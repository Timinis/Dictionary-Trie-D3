import { Graph, Edge, Node } from '../../sharedTypes';

let initialState: Graph = {
  nodesArray: [],
  edgesArray: []
};

type Action =
  | {
      type: ActionTypes.GraphAddEdge;
      payload: Edge;
    }
  | { type: ActionTypes.GraphAddNode; payload: Node };
enum ActionTypes {
  GraphAddNode = 'GRAPHADDNODE',
  GraphAddEdge = 'GRAPHADDEDGE'
}
export default (state = initialState, action: Action): Graph => {
  switch (action.type) {
    case ActionTypes.GraphAddNode:
      return {
        ...state,
        nodesArray: [...state.nodesArray, action.payload]
      };

    case ActionTypes.GraphAddEdge:
      return {
        ...state,
        edgesArray: [...state.edgesArray, action.payload]
      };

    default:
      return state;
  }
};
