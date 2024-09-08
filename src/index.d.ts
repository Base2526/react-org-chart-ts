import React from 'react';

interface Person {
  id: number;
  avatar: string;
  department: string;
  name: string;
  title: string;
  totalReports: number;
  color?: string;
}

interface Node {
  id: number;
  person: Person;
  hasChild: boolean;
  hasParent: boolean;
  children: Node[];
}

interface OrgChartProps {
  tree: Node;
  defualtConfig?: any;
  zoomInId?: string;
  zoomOutId?: string;
  resetPositionId?: string;
  minZoom?: number;
  maxZoom?: number;
  onConfigChange: (config: any) => void;
  loadConfig: (d: any) => any;
  loadImage: (data: any) => Promise<string>;
  loadParent: (d: any) => any;
  loadChildren: (d: any) => any;
  showDetail?: (d: any) => void;
}

declare class OrgChart extends React.Component<OrgChartProps> {
  render(): JSX.Element;
}

export default OrgChart;