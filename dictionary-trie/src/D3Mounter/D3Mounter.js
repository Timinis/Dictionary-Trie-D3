import * as D3 from 'd3';

let state = { needUpdate: false };

const initializer = (svgComponent, nodesArray, edgesArray, onLabels) => {
  state = { ...state, nodes: nodesArray, edges: edgesArray };
  let svg = D3.select(svgComponent),
    width = svgComponent.width.baseVal.value,
    height = svgComponent.height.baseVal.value;

  const simulation = D3.forceSimulation(state.nodes)
    .force(
      'link',
      D3.forceLink(state.edges)
        .distance(width / 20)
        .id(d => d.id)
    )
    .force('charge', D3.forceManyBody())
    .force('center', D3.forceCenter(width * 0.6, height / 2));

  const drag = simulation => {
    const dragstarted = d => {
      if (!D3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    };

    const dragged = d => {
      d.fx = D3.event.x;
      d.fy = D3.event.y;
    };

    const dragended = d => {
      if (!D3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    };

    return D3.drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended);
  };

  let themeColor = '#5B8BDA';

  let node = svg
    .append('g')
    .attr('stroke', '#fff')
    .attr('stroke-width', 1.5)
    .selectAll('circle')
    .data(state.nodes)
    .join('circle')
    .attr('r', 10)
    .style('fill', themeColor)
    .call(drag(simulation));

  let text = svg
    .append('g')
    .attr('stroke', '#999')
    .selectAll('text')
    .data(state.nodes)
    .join('text')
    .text(function(d) {
      return d.id;
    });

  let link = svg
    .append('g')
    .attr('stroke', '#999')
    .attr('stroke-opacity', 0.6)
    .selectAll('line')
    .data(state.edges)
    .join('line')
    .attr('stroke-width', d => Math.sqrt(d.value));

  simulation.on('tick', () => {
    if (onLabels) {
      text.attr('x', d => d.x + 10).attr('dy', d => d.y);
    }
    node.attr('cx', d => d.x).attr('cy', d => d.y);

    link
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y);
  });

  const restart = () => {
    // Apply the general update pattern to the nodes.
    node = node.data(state.nodes, d => {
      return d.id;
    });
    node.exit().remove();
    node = node
      .enter()
      .append('circle')
      .attr('r', 10)
      .style('fill', themeColor)
      .merge(node)
      .call(drag(simulation));

    // Apply the general update pattern to the links.
    link = link.data(state.edges, d => {
      return d.source.id + '-' + d.target.id;
    });
    link.exit().remove();
    link = link
      .enter()
      .append('line')
      .merge(link);
    if (onLabels) {
      text = text.data(state.nodes, d => {
        return d.id;
      });
      text.exit().remove();
      text = text
        .enter()
        .append('text')
        .text(function(d) {
          return d.id;
        })
        .merge(text)
        .call(drag(simulation));
    }

    // Update and restart the simulation.
    simulation.nodes(state.nodes);
    simulation.force('link').links(state.edges);
    simulation.alpha(1).restart();
  };

  D3.interval(
    () => {
      if (state.needUpdate) {
        state = { ...state, needUpdate: false };
        restart();
      }
    },
    1,
    D3.now()
  );
};

const updater = (nodesArray, edgesArray) => {
  state = { ...state, nodes: nodesArray, edges: edgesArray, needUpdate: true };
};

export { initializer, updater };
