import React, { Component } from 'react'
import { Icon, Menu, Segment,Button,Grid,Popup } from 'semantic-ui-react'
import {useState, useEffect} from 'react';
import NewLineChart from './ChartType/NewLineChart';
import NewBarChart from './ChartType/NewBarChart';
import NewAreaChart from './ChartType/NewAreaChart';
// ???May need to remove add new canva since new canva added when creating new view.
// Works to do: Handle duplicate name problem,handle undefined tooltip when legend is none, limit number of chart created!!


export default function ChartCanva(props) {


  // properties of visuals from props
  const[chartCanvas,setChartCanvas] = useState(props.visuals);

  // to identify chart rendered in comaprison or not
  const [compared,setCompared] = useState(false)

  // Record number of canva added(?)
  let idx = chartCanvas.length

  // content of selected canva
  const [activeCanva,setActiveCanva] = useState(chartCanvas[0]);

  // get properties of each visual --> not yet finish iterate
  const {chartType,viewName,dimension,metric,legend,is_composed,data} = activeCanva
  
  // get unique values in legendlabel
  const legendLabels = [...new Set(props.rawData.map(item => item[legend]))]

  // get length and unique values in dimension
  const dimensionValues = [...new Set(props.rawData.map(item => item[dimension]))]
  
  // query diemension,metric,legend and push to new array
  let newArray = []
  if(is_composed===true){
    newArray = data.slice()
  }else{
    for(let i=0;i<dimensionValues.length;i++){
      const newObject = {}
      newObject[dimension] = dimensionValues[i]
      for(let j=0;j<legendLabels.length;j++){
          let res = props.rawData.filter(item => item[dimension]==dimensionValues[i] && item[legend]==legendLabels[j] )
          if(res.length===0){
            //handle 0 record
            newObject[legendLabels[j]] = 0
          }else if(res.length===1){
            //handle 1 record
            newObject[legendLabels[j]] = res[0][metric]
          }else{
            //handle more than 1 records
            newObject[legendLabels[j]] = res.reduce((total, obj) => obj[metric] + total,0)
          }    
      }
      newArray.push(newObject)
    }      
  }



  
  // highlight selected canva and show content of selected canva
  const handleItemClick = (e, { name }) => {
    const activeCanva = chartCanvas.find(x => x.viewName === name)
    setActiveCanva(activeCanva)
  }
  

  // create new canva,update active canva and re-render menu item components
  // const handleCreateCanva = () => {
  //   const newName = `Chart ${idx+1}`
  //   const newView = {chartType:'',viewName:newName,dimension:'',metric:'',legend:''}
  //   const newChartCanvas = chartCanvas.slice()
  //   newChartCanvas.push(newView)
  //   idx = idx+1
  //   setChartCanvas(newChartCanvas)
  //   setActiveCanva(newView)
  // }

  // Show all Canvas components
  const allCanvas = chartCanvas.map(i =>         
    <Menu.Item
      name={i.viewName}
      active={activeCanva.viewName === i.viewName}
      onClick={handleItemClick}
    >
      <Popup size="mini" content={i.viewName} trigger={<div>{i.viewName.slice(0,15)}...</div>} />
    </Menu.Item>)


  //Show active Chart
  let activeChart = ''
  switch (activeCanva.chartType) {
    case 'Line Chart':
      activeChart= <NewLineChart activeCanva={activeCanva} data={newArray} palette={props.palette} compared={compared}/>
      break;
    case 'Bar Chart':
      activeChart= <NewBarChart activeCanva={activeCanva} data={newArray} palette={props.palette} compared={compared}/>
      break;
    case 'Scatter Plot':
      activeChart= <div>Scatter Plot</div>
      break;
    case 'Area Chart':
      activeChart= <NewAreaChart activeCanva={activeCanva} data={newArray} palette={props.palette} compared={compared}/>
      break;       
    default:
      activeChart= <div>Please add new chart</div>
  }

  // delete canva -> update visuals
  const handleDeleteCanva = (e,{name}) => {
    const filteredVisual = props.visuals.filter(x=> x.viewName!==name)
    props.clickHandler(filteredVisual)
  } 


  // update canvas when visuals state changed whether in adding or deleting
  useEffect(() => {
    setChartCanvas(props.visuals);
    setActiveCanva(props.visuals[props.visuals.length-1])
  }, [props.visuals]);

  return (
    <div>
      <Segment attached='top'>

        <Grid>
          <Grid.Row reversed>
            <Grid.Column width={10}>
            </Grid.Column>
            <Grid.Column width={4}>
            </Grid.Column>              
            <Grid.Column width={2}>
              <Button name={activeCanva.viewName} size='mini' onClick={handleDeleteCanva}><Icon name='close'/></Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            <h3>{activeCanva.viewName}</h3>
          </Grid.Row>
          <Grid.Row centered>{activeChart}</Grid.Row>
        </Grid>
      </Segment>
      <Menu attached='bottom' compact>
        {allCanvas}
      </Menu>
    </div>
  )

}