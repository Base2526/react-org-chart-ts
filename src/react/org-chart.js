import { createElement, PureComponent } from 'react';
import init from '../chart';

class OrgChart extends PureComponent {
  static defaultProps = {
    id: 'react-org-chart',
    downloadImageId: 'download-image',
    downloadPdfId: 'download-pdf',
    zoomInId: 'zoom-in',
    zoomOutId: 'zoom-out',
    zoomExtentId: 'zoom-extent',
  }
  
  componentDidMount() {

    console.log("componentDidMount :", this.props)
    const {
      id,
      downloadImageId,
      downloadPdfId,
      zoomInId,
      zoomOutId,
      zoomExtentId,
      tree,
      ...options
    } = this.props

    init({
      id: `#${id}`,
      downloadImageId: `#${downloadImageId}`,
      downloadPdfId: `#${downloadPdfId}`,
      zoomInId: zoomInId,
      zoomOutId: zoomOutId,
      zoomExtentId: zoomExtentId,
      data: tree,
      ...options,
    })
  }

  render() {
    const { id } = this.props
    return  createElement('div', { id })
  }
}

export default OrgChart
