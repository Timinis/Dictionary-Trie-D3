import * as D3 from 'd3';

export default (svgComponent, nodesArray, edgesArray, onLabels) => {
  let svg = D3.select(svgComponent),
    width = window.outerWidth,
    height = window.outerHeight;

  const simulation = D3.forceSimulation(nodesArray)
    .force(
      'link',
      D3.forceLink(edgesArray)
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
    .data(nodesArray)
    .join('circle')
    .attr('r', 10)
    .style('fill', themeColor)
    .call(drag(simulation));

  let text = svg
    .append('g')
    .attr('stroke', '#999')
    .selectAll('text')
    .data(nodesArray)
    .join('text')
    .text(function(d) {
      return d.id;
    });

  let link = svg
    .append('g')
    .attr('stroke', '#999')
    .attr('stroke-opacity', 0.6)
    .selectAll('line')
    .data(edgesArray)
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
    node = node.data(nodesArray, d => {
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
    link = link.data(edgesArray, d => {
      return d.source.id + '-' + d.target.id;
    });
    link.exit().remove();
    link = link
      .enter()
      .append('line')
      .merge(link);
    if (onLabels) {
      text = text.data(nodesArray, d => {
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
    simulation.nodes(nodesArray);
    simulation.force('link').links(edgesArray);
    simulation.alpha(1).restart();
  };

  D3.interval(
    () => {
      if (nodesArray.length < 15) {
        let randomGenerated = Math.random().toString();
        let randomTarget = Math.floor(Math.random() * nodesArray.length) - 1;
        if (randomTarget === -1) {
          randomTarget = 0;
        }
        let otherRandom = Math.floor(Math.random() * nodesArray.length) - 1;
        if (otherRandom === -1) {
          otherRandom = 0;
        }

        nodesArray.push({ id: randomGenerated, group: '1' });
        edgesArray.push({
          source: randomGenerated,
          value: '1',
          target: nodesArray[randomTarget].id
        });
        edgesArray.push({
          source: nodesArray[otherRandom].id,
          value: '1',
          target: nodesArray[randomTarget].id
        });

        restart();
      }
    },
    2000,
    D3.now()
  );
};
