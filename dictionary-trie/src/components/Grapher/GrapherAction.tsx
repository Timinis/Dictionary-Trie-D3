const nodeAdder = (payload: any) => {
  return {
    type: 'GRAPHADDNODE',
    payload: payload
  };
};

const edgeAdder = (payload: any) => {
  console.log(payload);
  return {
    type: 'GRAPHADDEDGE',
    payload: payload
  };
};
export { nodeAdder, edgeAdder };
