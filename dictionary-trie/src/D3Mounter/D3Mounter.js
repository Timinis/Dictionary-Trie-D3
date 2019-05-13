import * as D3 from 'd3';

const simulationCreator = (inputNodeArr, inputEdgesArr, height, width) => {
  return D3.forceSimulation(inputNodeArr)
    .force(
      'link',
      D3.forceLink(inputEdgesArr)
        .distance(d => d.value * 70)
        .id(d => d.id)
    )
    .force('charge', D3.forceManyBody())
    .force('collision', D3.forceCollide().radius(10))
    .force('center', D3.forceCenter(width * 0.6, height / 2));
};

const enterNode = (selection, nodesArray, themeColor, dragFunction) => {
  return selection
    .classed('node', true)
    .append('g')
    .attr('stroke', '#fff')
    .attr('stroke-width', 1.5)
    .selectAll('circle')
    .data(nodesArray)
    .join('circle')
    .attr('r', 10)
    .style('fill', themeColor)
    .call(dragFunction);
};

const enterText = (selection, inputNodesArray) => {
  return selection
    .classed('desc', true)
    .append('g')
    .attr('stroke', '#999')
    .selectAll('text')
    .data(inputNodesArray)
    .join('text')
    .text(d => {
      return d.id;
    });
};

const enterLink = (selection, inputEdgesArray) => {
  return selection
    .classed('link', true)
    .append('g')
    .attr('stroke', '#999')
    .attr('stroke-opacity', 0.6)
    .selectAll('line')
    .data(inputEdgesArray)
    .join('line')
    .attr('stroke-width', 1);
};

const updateLink = selection => {
  selection
    .attr('x1', d => d.source.x)
    .attr('y1', d => d.source.y)
    .attr('x2', d => d.target.x)
    .attr('y2', d => d.target.y);
};

const restartGraph = (
  nodeSelection,
  newInputNodeArr,
  themeColor,
  dragFunction,
  linkSelection,
  newInputEdgeArr,
  textSelection,
  simulationSelector
) => {
  simulationSelector.nodes(newInputNodeArr);
  simulationSelector.force('link').links(newInputEdgeArr);
  simulationSelector.alpha(1).restart();
  // Apply the general update pattern to the nodes.
  nodeSelection = nodeSelection.data(newInputNodeArr, d => {
    return d.id;
  });
  nodeSelection.exit().remove();
  nodeSelection = nodeSelection
    .enter()
    .append('circle')
    .attr('r', 10)
    .style('fill', themeColor)
    .merge(nodeSelection)
    .call(dragFunction);

  // Apply the general update pattern to the links.
  linkSelection = linkSelection.data(newInputEdgeArr, d => {
    return d.source.id + '-' + d.target.id;
  });
  linkSelection.exit().remove();
  linkSelection = linkSelection
    .enter()
    .append('line')
    .merge(linkSelection);
  if (textSelection) {
    textSelection = textSelection.data(newInputNodeArr, d => {
      return d.id;
    });
    textSelection.exit().remove();
    textSelection = textSelection
      .enter()
      .append('text')
      .text(function(d) {
        return d.id;
      })
      .merge(textSelection)
      .call(dragFunction);
  }
  return { nodeSelection, linkSelection, textSelection };
};

// const initializer = (svgElement, graph, onLabels) => {
//   console.log('im called');
//   let D3State = {
//     nodesArray: graph.nodesArray,
//     edgesArray: graph.edgesArray
//   };

//   let svg = D3.select(svgElement),
//     width = svgElement.width.baseVal.value,
//     height = svgElement.height.baseVal.value;

//   const simulation = D3.forceSimulation(D3State.nodesArray)
//     .force(
//       'link',
//       D3.forceLink(D3State.edgesArray)
//         .distance(width / 20)
//         .id(d => d.id)
//     )
//     .force('charge', D3.forceManyBody())
//     .force('center', D3.forceCenter(width * 0.6, height / 2));

// const drag = simulation => {
//   const dragstarted = d => {
//     if (!D3.event.active) simulation.alphaTarget(0.3).restart();
//     d.fx = d.x;
//     d.fy = d.y;
//   };

//   const dragged = d => {
//     d.fx = D3.event.x;
//     d.fy = D3.event.y;
//   };

//   const dragended = d => {
//     if (!D3.event.active) simulation.alphaTarget(0);
//     d.fx = null;
//     d.fy = null;
//   };

//   return D3.drag()
//     .on('start', dragstarted)
//     .on('drag', dragged)
//     .on('end', dragended);
// };

//   let themeColor = '#5B8BDA';

//   let node = svg
//     .append('g')
//     .attr('stroke', '#fff')
//     .attr('stroke-width', 1.5)
//     .selectAll('circle')
//     .data(D3State.nodesArray)
//     .join('circle')
//     .attr('r', 10)
//     .style('fill', themeColor)
//     .call(drag(simulation));

//   let text = svg
//     .append('g')
//     .attr('stroke', '#999')
//     .selectAll('text')
//     .data(D3State.nodesArray)
//     .join('text')
//     .text(function(d) {
//       return d.id;
//     });

//   let link = svg
//     .append('g')
//     .attr('stroke', '#999')
//     .attr('stroke-opacity', 0.6)
//     .selectAll('line')
//     .data(D3State.edgesArray)
//     .join('line')
//     .attr('stroke-width', d => Math.sqrt(d.value));

//   simulation.on('tick', () => {
//     if (onLabels) {
//       text.attr('x', d => d.x + 10).attr('dy', d => d.y);
//     }
//     node.attr('cx', d => d.x).attr('cy', d => d.y);

//     link
//       .attr('x1', d => d.source.x)
//       .attr('y1', d => d.source.y)
//       .attr('x2', d => d.target.x)
//       .attr('y2', d => d.target.y);
//   });

//     // Update and restart the simulation.
//     simulation.nodes(D3State.nodesArray);
//     simulation.force('link').links(D3State.edgesArray);
//     simulation.alpha(1).restart();
//   };

//   D3.interval(
//     () => {
//       if (updaterIsCalled) {
//         updaterIsCalled = false;
//         D3State = { ...newState };
//         newState = null;
//         restart();
//       }
//       if (resetState) {
//         console.log('im called');
//         resetState = false;
//         D3State = {};
//         return;
//       }
//     },
//     1,
//     D3.now()
//   );
// };

// const updater = newGraph => {
//   updaterIsCalled = true;
//   newState = newGraph;
// };

// const stateResetter = () => {
//   resetState = true;
// };

export {
  enterNode,
  enterLink,
  updateLink,
  enterText,
  restartGraph,
  simulationCreator
};
