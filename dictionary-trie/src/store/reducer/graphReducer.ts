import { Graph, Edge, Node } from '../../sharedTypes';

let initialState: Graph = {
  nodesArray: [
    { id: 'a' },
    { id: 'p1' },
    { id: 'p2' },
    { id: 'l' },
    { id: 'e' }
  ],
  edgesArray: [
    { source: 'a', value: 1, target: 'p1' },
    { source: 'p1', value: 1, target: 'p2' },
    { source: 'p2', value: 1, target: 'l' },
    { source: 'l', value: 1, target: 'e' }
  ]
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
