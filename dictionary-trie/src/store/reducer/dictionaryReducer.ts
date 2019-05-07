let initialState: any = {
  nodesArray: [],
  edgesArray: []
};

export default (state = initialState, action: any) => {
  let { type, payload } = action;

  switch (type) {
    case 'DICTIONARYADDNODE':
      return {
        ...state,
        nodesArray: [...state.nodesArray, payload]
      };
    case 'DICTIONARYADDEDGE':
      console.log(payload);
      return {
        ...state,
        edgesArray: [...state.edgesArray, payload]
      };

    default:
      return state;
  }
};
