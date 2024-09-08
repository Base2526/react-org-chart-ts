import * as d3 from 'd3';
// import ReactDOM from 'react-dom';
// import { SmileOutlined, DownOutlined } from '@ant-design/icons';

import { wrapText, helpers, covertImageToBase64 } from '../utils';
import renderLines from './renderLines';
import exportOrgChartImage from './exportOrgChartImage';
import exportOrgChartPdf from './exportOrgChartPdf';
import onClick from './onClick';
import iconLink from './components/iconLink';
import supervisorIcon from './components/supervisorIcon';

const CHART_NODE_CLASS = 'org-chart-node'
const PERSON_LINK_CLASS = 'org-chart-person-link'
const PERSON_NAME_CLASS = 'org-chart-person-name'
const PERSON_TITLE_CLASS = 'org-chart-person-title'
const PERSON_HIGHLIGHT = 'org-chart-person-highlight'
const PERSON_REPORTS_CLASS = 'org-chart-person-reports'

export default function render(config) {
  const {
    svgroot,
    svg,
    tree,
    animationDuration,
    nodeWidth,
    nodeHeight,
    nodePaddingX,
    nodePaddingY,
    nodeBorderRadius,
    backgroundColor,
    nameColor,
    titleColor,
    reportsColor,
    borderColor,
    avatarWidth,
    lineDepthY,
    treeData,
    sourceNode,
    onPersonLinkClick,
    loadImage,
    downloadImageId,
    downloadPdfId,
    elemWidth,
    margin,
    onConfigChange,
  } = config

  // Compute the new tree layout.
  const nodes = tree.nodes(treeData).reverse()
  const links = tree.links(nodes)

  config.links = links
  config.nodes = nodes

  // Normalize for fixed-depth.
  nodes.forEach(function(d) {
    d.y = d.depth * lineDepthY
  })

  // Update the nodes
  const node = svg.selectAll('g.' + CHART_NODE_CLASS).data(
    nodes.filter(d => d.id),
    d => d.id
  )

  const parentNode = sourceNode || treeData

  svg.selectAll('#supervisorIcon').remove()

  supervisorIcon({
    svg: svg,
    config,
    treeData,
    x: 70,
    y: -24,
  })

  // Enter any new nodes at the parent's previous position.
  const nodeEnter = node
    .enter()
    .insert('g')
    .attr('class', CHART_NODE_CLASS)
    .attr('transform', `translate(${parentNode.x0}, ${parentNode.y0})`)
    // .on('click', onClick(config))
    .on('click', (node)=>{ 
      onClick(config, node)
    })
   
  // Person Card Shadow
  nodeEnter
    .append('rect')
    .attr('width', nodeWidth)
    .attr('height', nodeHeight)
    .attr('fill', backgroundColor)
    .attr('stroke', borderColor)
    .attr('rx', nodeBorderRadius)
    .attr('ry', nodeBorderRadius)
    .attr('fill-opacity', 0.05)
    .attr('stroke-opacity', 0.025)
    .attr('filter', 'url(#boxShadow)')

  // Person Card Container
  nodeEnter
    .append('rect')
    .attr('class', d => (d.isHighlight ? `${PERSON_HIGHLIGHT} box` : 'box'))
    .attr('width', nodeWidth)
    .attr('height', nodeHeight)
    .attr('id', d => d.id)
    .attr('fill', backgroundColor)
    .attr('stroke', borderColor)
    .attr('rx', nodeBorderRadius)
    .attr('ry', nodeBorderRadius)
    .style('cursor', helpers.getCursorForNode)
    
  const namePos = {
    x: nodeWidth / 2,
    y: nodePaddingY * 1.8 + avatarWidth,
  }

  const avatarPos = {
    x: nodeWidth / 2 - avatarWidth / 2,
    y: nodePaddingY / 2,
  }

  // Person's Name
  nodeEnter
    .append('text')
    .attr('class', PERSON_NAME_CLASS + ' unedited')
    .attr('x', namePos.x)
    .attr('y', namePos.y)
    .attr('dy', '.3em')
    .style('cursor', 'pointer')
    .style('fill', nameColor)
    .style('font-size', 14)
    .text(d => d.person.name)
    // .on('click', onParentClick(config))
    // Add mouseover and mouseout event listeners
    .on('mouseover', function(event, d) {
      d3.select(this)
      .style('border', '4px solid blue') // Change border on mouseover
      .style('opacity', 0.5); // Slightly reduce opacity
    })
    .on('mouseout', function(event, d) {
      d3.select(this)
        .style('border', '2px solid black') // Revert border on mouseout
        .style('opacity', 1); // Restore opacity
    })


  // example add icon to d3 
  // import ReactDOM from 'react-dom';
  // import { SmileOutlined } from '@ant-design/icons';
  // nodeEnter.append('foreignObject')
  // .attr('width', 30)
  // .attr('height', 30)
  // .attr('x', nodeWidth /2 - 30 / 2)  // Position it 30 units from the right edge
  // .attr('y', nodeHeight - 30/2)  // Position it 30 units from the bottom edge
  // .each(function() {
  //   const node = d3.select(this);
  //   const div = document.createElement('div');
  //   node.node().appendChild(div);
  //   // Create a root and render the React component
  //   const root = ReactDOM.createRoot(div);
  //   root.render(<SmileOutlined style={{ fontSize: '24px', color: 'blue' }} />);
  // });

  // Person's Title
  nodeEnter
    .append('text')
    .attr('class', PERSON_TITLE_CLASS + ' unedited')
    .attr('x', nodeWidth / 2)
    .attr('y', namePos.y + nodePaddingY * 2.4)
    .attr('dy', '0.1em')
    .style('font-size', 12)
    .style('cursor', 'pointer')
    .style('fill', titleColor)
    .text(d => d.person.title)
    // Add mouseover and mouseout event listeners
    .on('mouseover', function(event, d) {
      d3.select(this)
      .style('border', '4px solid blue') // Change border on mouseover
      .style('opacity', 0.5); // Slightly reduce opacity
    })
    .on('mouseout', function(event, d) {
      d3.select(this)
        .style('border', '2px solid black') // Revert border on mouseout
        .style('opacity', 1); // Restore opacity
    })

  const heightForTitle = 60 // getHeightForText(d.person.title)

  // Person's Reports
  nodeEnter
    .append('text')
    .attr('class', PERSON_REPORTS_CLASS)
    .attr('x', nodePaddingX + 8)
    .attr('y', namePos.y + nodePaddingY + heightForTitle)
    .attr('dy', '.9em')
    .style('font-size', 14)
    .style('font-weight', 400)
    .style('cursor', 'pointer')
    .style('fill', reportsColor)
    .text(helpers.getTextForTitle)

  ////////
  const longPressDuration = 200; // duration for long press in ms
  let pressTimer;
  const handleMouseDown = (node) => {
    // Start the timer on mouse down
    pressTimer = setTimeout(() => {
      // Trigger the long-press action
      console.log('Long press detected on node:', node);

      d3.event && d3.event.stopPropagation()

      if(config){
        let { showDetail } = config
        showDetail(node)
      }

      // You can add additional actions here, e.g., showing a context menu
    }, longPressDuration);
  };
  
  const handleMouseUp = () => {
    // Clear the timer on mouse up (if the press is shorter than the long press duration)
    clearTimeout(pressTimer);
  };
  
  const handleMouseLeave = () => {
    // Clear the timer if the mouse leaves the element
    clearTimeout(pressTimer);
  };

  ////////
  // Person's Avatar
  nodeEnter
    .append('image')
    .attr('id', d => `image-${d.id}`)
    .attr('width', avatarWidth)
    .attr('height', avatarWidth)
    .attr('x', avatarPos.x)
    .attr('y', avatarPos.y)
    .attr('stroke', borderColor)
    .style('cursor', 'pointer')
    .attr('s', d => {
      d.person.hasImage
        ? d.person.avatar
        : loadImage(d).then(res => {
            console.log("render >> ", res)
            covertImageToBase64(res, function(dataUrl) {
              d3.select(`#image-${d.id}`).attr('href', dataUrl)
              d.person.avatar = dataUrl
            })
            d.person.hasImage = true
            return d.person.avatar
          })
    })
    .attr('src', d => d.person.avatar)
    .attr('href', d => d.person.avatar)
    .attr('clip-path', 'url(#avatarClip)')
    .style('border', '2px solid black') // Initial border style
    // .on('click', (node)=>{ 
    //   d3.event && d3.event.stopPropagation()
    //   if(config){
    //     let { showDetail } = config
    //     showDetail(node)
    //   }
    // })
    .on('mouseover', function(event, d) {
      d3.select(this)
      .style('border', '4px solid blue') // Change border on mouseover
      .style('opacity', 0.5); // Slightly reduce opacity
    })
    .on('mouseout', function(event, d) {
      d3.select(this)
        .style('border', '2px solid black') // Revert border on mouseout
        .style('opacity', 1); // Restore opacity
    })
    .on('mousedown', handleMouseDown) // Detect press start
    .on('mouseup', handleMouseUp) // Detect press end
    .on('mouseleave', handleMouseLeave); // Clear the press if the user moves away from the element;

  // Person's Link
  const nodeLink = nodeEnter
    .append('a')
    .attr('class', PERSON_LINK_CLASS)
    .attr('display', d => (d.person.link ? '' : 'none'))
    .attr('xlink:href', d => d.person.link)
    .on('click', datum => {
      d3.event && d3.event.stopPropagation()
      // TODO: fire link click handler
      if (onPersonLinkClick) {
        onPersonLinkClick(datum, d3.event)
      }
    })

  // Draw a dot
  // nodeEnter.append('circle')
  //   .attr('cx', nodeWidth/2) // X position
  //   .attr('cy', nodeHeight) // Y position
  //   .attr('r', 10) // Radius
  //   .style('fill', 'blue'); // Fill color

  // example add icon to d3 
  // import ReactDOM from 'react-dom';
  // import { SmileOutlined } from '@ant-design/icons';
  // let widthL = 30;
  // nodeEnter.append('foreignObject')
  // .attr('width', widthL)
  // .attr('height', widthL)
  // .attr('x', (nodeWidth / 2) - (widthL / 2) ) 
  // .attr('y', nodeHeight - ( widthL / 2) ) 
  // .each(function() {
  //   const node = d3.select(this);
  //   const div = document.createElement('div');
  //   div.style.width = `${widthL}px`;
  //   div.style.height = `${widthL}px`;
  //   div.style.display = 'flex';
  //   div.style.alignItems = 'center';
  //   div.style.justifyContent = 'center';
  //   node.node().appendChild(div);
    
  //   // Create a root and render the React component
  //   const root = ReactDOM.createRoot(div);
  //   root.render(<DownOutlined style={{ fontSize: '10px' }} />);
  // });

  iconLink({
    svg: nodeLink,
    x: nodeWidth - 20,
    y: 8,
  })

  // Transition nodes to their new position.
  const nodeUpdate = node
    .transition()
    .duration(animationDuration)
    .attr('transform', d => `translate(${d.x},${d.y})`)

  nodeUpdate
    .select('rect.box')
    .attr('fill', d=>d.person.color /*  backgroundColor*/ )
    .attr('stroke', borderColor)

  // Transition exiting nodes to the parent's new position.
  const nodeExit = node
    .exit()
    .transition()
    .duration(animationDuration)
    .attr('transform', d => `translate(${parentNode.x},${parentNode.y})`)
    .remove()

  // Update the links
  const link = svg.selectAll('path.link').data(links, d => d.target.id)

  // Wrap the title texts
  const wrapWidth = 124
  svg.selectAll('text.unedited.' + PERSON_NAME_CLASS).call(wrapText, wrapWidth)
  svg.selectAll('text.unedited.' + PERSON_TITLE_CLASS).call(wrapText, wrapWidth)

  // Render lines connecting nodes
  renderLines(config)

  // Stash the old positions for transition.
  nodes.forEach(function(d) {
    d.x0 = d.x
    d.y0 = d.y
  })

  var nodeLeftX = -70
  var nodeRightX = 70
  var nodeY = 200
  nodes.map(d => {
    nodeLeftX = d.x < nodeLeftX ? d.x : nodeLeftX
    nodeRightX = d.x > nodeRightX ? d.x : nodeRightX
    nodeY = d.y > nodeY ? d.y : nodeY
  })

  config.nodeRightX = nodeRightX
  config.nodeY = nodeY
  config.nodeLeftX = nodeLeftX * -1

  d3.select(downloadImageId).on('click', function() {
    exportOrgChartImage(config)
  })

  d3.select(downloadPdfId).on('click', function() {
    exportOrgChartPdf(config)
  })
  onConfigChange(config)


}
