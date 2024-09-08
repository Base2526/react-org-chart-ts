import * as d3 from 'd3'
import onParentClick from '../onParentClick';

export default function supervisorIcon({
  svg,
  config,
  treeData,
  x = 5,
  y = 5,
}) {
  const container = svg
    .append('g')
    .attr('id', 'supervisorIcon')
    .on('click', d => {
      if ( d3.event && d3.event.defaultPrevented) return;
      onParentClick(config, treeData);
    })
    .attr('stroke', 'none')
    .attr('fill', 'none')
    .style('display', treeData.hasParent ? '' : 'none')
    .style('cursor', 'pointer')
    .append('g');
    

  const icon = container
    .append('g')
    .attr('id', 'icon')
    .attr('fill', 'none')
    .attr('fill-rule', 'evenodd')
    .attr('transform', `translate(51.5, -46)`);

  icon
    .append('circle')
    .attr('id', 'icon')
    .attr('stroke', '#C9C9C9')
    .attr('fill', '#FFF')
    .attr('cx', 15.5)
    .attr('cy', 15.5)
    .attr('r', 15.5);

  icon
    .append('path')
    .attr('stroke', '#C9C9C9')
    .attr('stroke-linecap', 'square')
    .attr('d', 'M15.5 45V31.5');

  icon
    .append('circle')
    .attr('id', 'icon')
    .attr('stroke', '#979797')
    .attr('fill', '#9C9C9C')
    .attr('cx', 9)
    .attr('cy', 16)
    .attr('r', 2);

  icon
    .append('circle')
    .attr('id', 'icon')
    .attr('stroke', '#979797')
    .attr('fill', '#9C9C9C')
    .attr('cx', 15.5)
    .attr('cy', 16)
    .attr('r', 2);

  icon
    .append('circle')
    .attr('id', 'icon')
    .attr('stroke', '#979797')
    .attr('fill', '#9C9C9C')
    .attr('cx', 22)
    .attr('cy', 16)
    .attr('r', 2);

  icon
    .append('rect')
    .attr('id', 'bounds')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', 33)
    .attr('height', 47)
    .attr('fill', 'transparent');
}
