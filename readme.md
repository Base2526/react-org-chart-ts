# react-org-chart-ts
[![npm version](https://badge.fury.io/js/@somkid.sim%2Freact-org-chart-ts.svg)](https://badge.fury.io/js/@somkid.sim%2Freact-org-chart-ts)

React component for displaying organizational charts.

This component is based on [coreseekdev/react-org-chart](https://github.com/coreseekdev/react-org-chart). On top of it, we added a few customization to fulfill our requirements.

### [View demo](https://unicef.github.io/react-org-chart/)


# Features

From the original package:

- High-performance D3-based SVG rendering
- Lazy-load children with a custom function
- Handle up to 1 million collapsed nodes and 5,000 expanded nodes
- Pan (drag and drop)
- Zoom in zoom out (with mouse wheel/scroll)

What we added:

- Lazy-load of parents (go up in the tree)
- Zoom in, zoom out and zoom buttons.
- Download orgchart as image or PDF

07/Sep/2024
- Support Typescript 

### React Props

| **property**      | **type**   | **description**                                                           | **example**                                                        |
| ----------------- | ---------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| tree              | `Object`   | Nested data model with some of all the employees in the company (Required)     | See sample below. |
| nodeWidth         | `Number`   | Width of the component for each individual (Optional)                     | 180                                                                |
| nodeHeight        | `Number`   | Height of the component for each individual (Optional)                    | 100                                                                |
| nodeSpacing       | `Number`   | Spacing between each of the nodes in the chart (Optional)                 | 12                                                                 |
| animationDuration | `Number`   | Duration of the animations in milliseconds (Optional)                     | 350                                                                |
| lineType          | `String`   | Type of line that connects the nodes to each other (Optional)             | “angle” “curve”                                                    |
| downloadImageId   | `String`   | Id of the DOM element that, on click, will trigger the download of the org chart as PNG. OrgChart will bind the click event to the DOM element with this ID (Optional) | "download-image" (default)                                         |
| downloadPdfId     | `String`   | Id of the DOM element that, on click, will trigger the download of the org chart as PDF. OrgChart will bind the click event to the DOM element with this ID (Optional)  (Optional)        | "download-pdf" (default)                                           |
| zoomInId          | `String`   | Id of the DOM element that, on click, will trigger a zoom of the org chart. OrgChart will bind the click event to the DOM element with this ID (Optional)  (Optional)                                     | "zoom-in" (default)                                                |
| zoomOutId         | `String`   | Id of the DOM element that, on click, will trigger the zoom out of the org chart. OrgChart will bind the click event to the DOM element with this ID (Optional)                                  | "zoom-out" (default)                                               |
| zoomExtentId      | `String`   | Id of the DOM element that, on click, will display whole org chart svg fit to screen. OrgChart will bind the click event to the DOM element with this ID(Optional)                              | "zoom-extent" (default)                                            |
| loadParent(personData)        | `Function` | Load parent with one level of children (Optional)                         | See usage below                                                  |
| loadChildren (personData)      | `Function` | Load the children of particular node (Optional)                           | See usage below                                                  |
| onConfigChange    | `Function` | To set the latest config to state on change                               | See usage below                                                  |
| loadConfig        | `Function` | Pass latest config from state to OrgChart                                    | See usage below                                                  |
| loadImage(personData)         | `Function` | To get image of person on API call (Optional)                             | See usage below                                                  | 
| resetPositionId         | `String` | To get image of person on API call (Optional)                             | See usage below                                                  |
| minZoom         | `float` | To get image of person on API call (Optional)                             | See usage below                                                  |
| maxZoom         | `float` | To get image of person on API call (Optional)                             | See usage below                                                  |
| showDetail(personData)         | `Function` | To get image of person on API call (Optional)                             | See usage below                                                  |


### Sample tree data

```jsx
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

```

### Usage

You have a complete working example in the **[examples/](https://github.com/unicef/react-org-chart/tree/master/examples)** folder 

```jsx
import React, { useState, useEffect } from 'react';

import OrgChart from '@simple/react-org-chart-ts'
import photo from './assets/logo192.png'
import { generateTreeData } from "./faker"
import { Node, TreeNode } from "./interface" 

let  confg = {}
const App: React.FC = () => {
  const [treeData, setTreeData] = useState<TreeNode[]>([]);

  useEffect(()=>{
    // // 1 top-level node, 2 children per node, 4 levels deep
    setTreeData(generateTreeData(1, 7, 2));
  }, [])
 
  return  <div>
            <div className="zoom-buttons">
              <button
                className="btn btn-outline-primary zoom-button"
                id="zoom-in"
              >+</button>
              <button
                className="btn btn-outline-primary zoom-button"
                id="zoom-out"
              >-</button>
              <button
                className="btn btn-outline-primary zoom-button"
                id="reset-position"
              >R</button>
            </div>
            {treeData.length > 0 &&   
            <OrgChart 
              tree={treeData[0]}
              zoomInId= {"zoom-in"}
              zoomOutId= {"zoom-out"}
              resetPositionId= {"reset-position"}
              // minZoom={0.01}
              // lineType={'curve'}
              loadConfig={(d: any) => {
                return confg
              }}
              onConfigChange={(config: any) => {
                confg = config
              }}
              loadImage={(d : Node) => {
                return Promise.resolve(photo)
              }}
              loadParent={(d : Node) => {
                console.log("loadParent :", d)
                return []
              }}
              loadChildren={(d : Node) => {
                console.log("loadChildren :", d)
                return []
              }} 
              showDetail={(d : Node) => {
                console.log("showDetail :", d)
              }}
              />}
          </div>
};

export default App;
```

# File .d.ts
```
declare module '@simple/react-org-chart-ts' {
    import { ComponentType } from 'react';
  
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
        lineType?: string; // angle, curve
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
}
```

# Development

```bash
git clone https://github.com/Base2526/react-org-chart-ts.git
cd react-org-chart-ts
npm install
```

To build in watch mode:

```bash
npm start
```

To build for production

```bash
npm run build
```

Running the example:

```bash
cd example/
npm install # Only first time
npm start
```

To deploy the example to gh-pages site

```bash
npm run deploy
```

## About UNICEF

[UNICEF](https://www.unicef.org/) works in over 190 countries and territories to protect the rights of every child. UNICEF has spent more than 70 years working to improve the lives of children and their families. In UNICEF, we **believe all children have a right to survive, thrive and fulfill their potential – to the benefit of a better world**.

[Donate](https://donate.unicef.org/donate/now)


## Collaborations and support

Just fork the project and make a pull request. You may also [consider donating](https://donate.unicef.org/donate/now).


# License

Copyright 2019-2020 UNICEF http://www.unicef.org
Developed by ICTD, Solutions Center and Support, Digital Tools and Platforms, Custom Applications Team, New York.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
