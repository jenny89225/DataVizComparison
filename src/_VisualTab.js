import React from 'react'
import { Tab } from 'semantic-ui-react'
import ComparisonCanva from './ComparisonCanva';
import DatasetTable from './DatasetTable';
import UploadDataset from './UploadDataset';
import ChartCanva from './ChartCanva';

const panes = [
  { menuItem: 'Data Source', render: () => <Tab.Pane><UploadDataset/><DatasetTable/></Tab.Pane> },
  { menuItem: 'Charts', render: () => <Tab.Pane><ChartCanva/></Tab.Pane> },
  { menuItem: 'Comparison', render: () => <Tab.Pane><ComparisonCanva palette={palette}/></Tab.Pane> },
]

// const palette = ['#5E67C2',"#4F8886","#C067BC","#FF719F","#FF947B","#00A1EC","#FFC563","#F9F871","#00D2E9","#BF464D"]
const palette = [
  'red',
  'orange',
  'yellow',
  'olive',
  'green',
  'teal',
  'blue',
  'violet',
  'purple',
  'pink',
  'brown',
  'grey',
  'black',]

const VisualTab = () => (
  <Tab menu={{ 
    fluid: true, 
    vertical: true, 
    tabular: true,
   }} panes={panes} />
)

export default VisualTab
