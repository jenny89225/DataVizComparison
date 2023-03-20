import React, { useState, useEffect } from "react";
import {Segment,Image,Dropdown,Button,Grid,Pagination} from 'semantic-ui-react'
import NewLineChart from './ChartType/NewLineChart'
import NewBarChart from './ChartType/NewBarChart'
import NewAreaChart from "./ChartType/NewAreaChart";
import 'semantic-ui-css/semantic.min.css'

// comparison canva should remeber operands -> table attribute
//? need to fix the layout when operand 5, the dropdown size

export default function ComparisonCanva(props){
    const allVisuals = props.visuals

    //selectedvisual based on selected dropdown
    const [selectedVisual,setSelectedVisual] = useState(allVisuals[0])

    //selectedoperand based on selected dropdown
    const [selectedOpType,setSelectedOpType] = useState("")    

    // get properties of each visual --> not yet finish iterate
    const {chartType,viewName,dimension,metric,legend} = selectedVisual

    // to identify chart rendered in comaprison or not
    const [compared,setCompared] = useState(true)

    // set selected dot for constant and mark in line chart
    const [selectedDot, setSelectedDot] = useState({ x: null, y: null });

    // active bar idx
    const [activeIndex, setActiveIndex] = useState(-1);
    // active bar datak
    const [activeBar, setActiveBar] = useState(-1);

    // legend show or hide
    const [showLegend, setShowLegend] = useState(true);

    // get unique values in legendlabel
    const legendLabels = [...new Set(props.rawData.map(item => item[legend]))]

    // get length and unique values in dimension
    const dimensionValues = [...new Set(props.rawData.map(item => item[dimension]))]
    
    // query diemension,metric,legend and push to new array 
    const newArray = []
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


    // refresh operands 
    const handleClickonRefresh = () =>{
        props.safetyCheckHandler(false)
        if (selectedOpType!="Entire Chart"){
            setSelectedDot({x:null,y:null})
            setActiveIndex(-1)
            setActiveBar(-1)
            setShowLegend(false)
            const newOperand = {}
            newOperand.idx=props.itemIdx
            newOperand.isSelected = false
            newOperand.opType = selectedOpType
            newOperand.dimensionValue=[]     
            newOperand.legendValue=[]
            newOperand.metricValue=[]
            newOperand.data=[]
            props.setOperandsHandler(newOperand)
        }
    }


    //Show selected Chart
    let activeChart = ''
    switch (selectedVisual.chartType) {
    case 'Line Chart':
        activeChart= <NewLineChart 
                        activeCanva={selectedVisual} 
                        data={newArray} 
                        palette={props.palette} 
                        compared={compared} 
                        opType={selectedOpType}
                        setOperandsHandler={props.setOperandsHandler}
                        idx={props.itemIdx}
                        items={props.items}
                        selectedDot={selectedDot}
                        setSelectedDot={setSelectedDot}
                    />
        break;
    case 'Bar Chart':
        activeChart= <NewBarChart 
                        activeCanva={selectedVisual} 
                        data={newArray} 
                        palette={props.palette} 
                        compared={compared} 
                        opType={selectedOpType}
                        setOperandsHandler={props.setOperandsHandler}
                        idx={props.itemIdx}
                        items={props.items}
                        activeIndex={activeIndex}
                        setActiveIndex={setActiveIndex}
                        activeBar={activeBar} 
                        setActiveBar={setActiveBar}
                        showLegend={showLegend}
                    />
        break;
    case 'Scatter Plot':
        activeChart= <div>Scatter Plot</div>
        break;
    case 'Area Chart':
        activeChart=  <NewAreaChart 
                        activeCanva={selectedVisual} 
                        data={newArray} 
                        palette={props.palette} 
                        compared={compared} 
                        opType={selectedOpType}
                        setOperandsHandler={props.setOperandsHandler}
                        idx={props.itemIdx}
                        items={props.items}
                        activeIndex={activeIndex}
                        setActiveIndex={setActiveIndex}
                        activeBar={activeBar} 
                        setActiveBar={setActiveBar}
                        showLegend={showLegend}
                     />
        break;              
    default:
        activeChart= <div>Please add new chart</div>
    }

    // highlight selected canva and show content of selected canva
    const handleItemChange = (e, data) => {
        const activeCanva = allVisuals.find(x => x.viewName === data.value)
        setSelectedVisual(activeCanva)
    }

    // change interaction based on selected operand
    // if operandtype is entire chart than update operand
    const handleOperandChange = (e, data) => {
        setSelectedOpType(data.value)
        // whenever opType changed, update reference dot to hide the refenrence dot
        setSelectedDot({x:null,y:null})
        if( data.value==="Entire Chart"){
            const metricValue_lst = []
            legendLabels.forEach((item)=> {
                let m = newArray.map(metric => metric[item])
                metricValue_lst.push(m)
            })
            
            const newOperand ={
                idx:props.itemIdx,   
                isSelected:true,         
                visualName:viewName,
                opType:data.value,
                dimensionValue:dimensionValues,           
                legendValue:legendLabels,
                metricValue:metricValue_lst,
                dimension:dimension,
                metric:metric,
                legend:legend,
                data:newArray
            }
            props.setOperandsHandler(newOperand)
            // console.log(newOperand)
        }
    }





    return(
        <Segment>           
            <Grid>
                <Grid.Row centered>
                    <h3>Please select chart {props.operator.name=="Decomposition-explode"?"":"and operand type"} </h3>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column width={7} style={{paddingLeft: 2,paddingRight: 2}}>
                        <Dropdown 
                            placeholder='Select Visual' 
                            fluid 
                            selection 
                            options={props.options.visualOptions}
                            defaultValue={selectedVisual.viewName}
                            onChange={handleItemChange}
                            style={{fontSize:"12px"}}
                        />
                    </Grid.Column>                    
                    <Grid.Column width={5} style={{paddingLeft: 2,paddingRight: 2}} >
                        <Dropdown 
                            placeholder='Select Operand' 
                            fluid 
                            // inline
                            selection
                            options={props.operator.name=="Decomposition-explode"?props.options.operandOptions.slice(0,1):props.options.operandOptions}
                            onChange={handleOperandChange}
                            style={{fontSize:"12px"}}
                            
                        />
                    </Grid.Column>
                    <Grid.Column width={4} style={{paddingLeft: 2,paddingRight: 2}}>
                        <Button 
                            size='mini' 
                            disabled={props.operator.name=="Decomposition-explode"?true:false}
                            onClick={handleClickonRefresh}
                        >Refresh Operands</Button>        
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered><h3>{selectedVisual.viewName}</h3></Grid.Row>
                <Grid.Row centered>{activeChart}</Grid.Row>
                
            </Grid>
        </Segment>
    )
}

