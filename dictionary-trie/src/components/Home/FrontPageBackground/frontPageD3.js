import * as D3 from 'd3';

export default (svgComponent, nodesArray, edgesArray) => {
  let svg = D3.select(svgComponent),
    width = window.outerWidth,
    height = window.outerHeight;

  const simulation = D3.forceSimulation(nodesArray)
    .force('link', D3.forceLink(edgesArray).id(d => d.id))
    .force('charge', D3.forceManyBody())
    .force('center', D3.forceCenter(width / 2, height / 2));

  const node = svg
    .append('g')
    .attr('stroke', '#fff')
    .attr('stroke-width', 1.5)
    .selectAll('circle')
    .data(nodesArray)
    .join('circle')
    .attr('r', 5);

  const link = svg
    .append('g')
    .attr('stroke', '#999')
    .attr('stroke-opacity', 0.6)
    .selectAll('line')
    .data(edgesArray)
    .join('line')
    .attr('stroke-width', d => Math.sqrt(d.value));
  console.log(link);

  simulation.on('tick', () => {
    link
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y);
    node.attr('cx', d => d.x).attr('cy', d => d.y);
  });
};
