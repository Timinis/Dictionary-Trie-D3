import { Graph, Edge, Node } from '../../sharedTypes';

let initialState: Graph = {
  nodesArray: [],
  edgesArray: []
};

type Action =
  | {
      type: ActionTypes.DictionaryAddEdge;
      payload: Edge;
    }
  | { type: ActionTypes.DictionaryAddNode; payload: Node };
enum ActionTypes {
  DictionaryAddNode = 'DICTIONARYADDNODE',
  DictionaryAddEdge = 'DICTIONARYADDEDGE'
}
export default (state = initialState, action: Action): Graph => {
  switch (action.type) {
    case ActionTypes.DictionaryAddNode:
      return {
        ...state,
        nodesArray: [...state.nodesArray, action.payload]
      };

    case ActionTypes.DictionaryAddEdge:
      return {
        ...state,
        edgesArray: [...state.edgesArray, action.payload]
      };

    default:
      return state;
  }
};
