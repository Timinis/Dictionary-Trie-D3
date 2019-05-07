let initialState: any = {
  nodesArray: [],
  edgesArray: []
};

export default (state = initialState, action: any) => {
  let { type, payload } = action;

  switch (type) {
    case 'GRAPHADDNODE':
      return {
        ...state,
        nodesArray: [...state.nodesArray, payload]
      };

    case 'GRAPHADDEDGE':
      console.log(payload);
      return {
        ...state,
        edgesArray: [...state.edgesArray, payload]
      };

    default:
      return state;
  }
};
