import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer ,
  AreaChart,
  ReferenceLine,
  Area,
  ReferenceDot
} from "recharts";


// how to select different chart type
// entire chart -> no selection
// marks -> show selected dot on screen
// constant value -> legend label disappers
// legend label -> only show lines with selected legend labels

export default function NewLineChart(props){
    const{chartType,viewName,dimension,metric,legend} = props.activeCanva
    
    const newData = props.data.slice()
    const labels = Object.keys(newData[0]).slice(1)

    // deconstrut dot coordinates to show reference dot or not
    const newDot = {...props.selectedDot}
    
    // set stroke width to 3
    const [opacity, setOpacity] = useState(labels.reduce((labels,curr)=> (labels[curr]=2,labels),{}));

    // set category hide or show
    const [catShow,setCatShow] = useState(labels.reduce((labels,curr)=> (labels[curr]=false,labels),{}))

    //Set operands for marks and constant values
    const handleMouseClickonDot = (event) =>{
        const { cx, cy, stroke, payload, dataKey,value,color} = event
        const xValue = payload[dimension]
        props.setSelectedDot({x:xValue,y:value})
        const legendVal = props.opType==="Constant Value"? "None":dataKey
        const dimensionVal = props.opType==="Constant Value"? "None":xValue
        const newOperand ={
            idx:props.idx,   
            isSelected:true,         
            visualName:viewName,
            opType:props.opType,
            dimensionValue:[dimensionVal],           
            legendValue:[legendVal],
            metricValue:[value],
            dimension:dimension,
            metric:metric,
            legend:legend,
            data:[{[dimension]:dimensionVal,[legendVal]:value}]
        }
        props.setOperandsHandler(newOperand)
        }        
    
    //Set operands for legend label
    const handleClickonLegend = (event) =>{
        
        const { dataKey } = event
        const op = catShow[dataKey]
        setOpacity({ ...opacity, [dataKey]: 5 });
        if(op){
            setCatShow({ ...catShow, [dataKey]:false});
            setOpacity({ ...opacity, [dataKey]: 2 });
            const newOperand = {
                idx:props.idx,
                isSelected:false,  
                visualName:viewName,
                opType:props.opType,
                dimensionValue:null,           
                legendValue:null,
                metricValue:null,
                dimension:dimension,
                metric:metric,
                legend:legend,
                data:null
            }
            props.setOperandsHandler(newOperand)
        }else{
            setCatShow({ ...catShow, [dataKey]:true });
            setOpacity({ ...opacity, [dataKey]: 10 });
            const filteredData = newData.map(item=> item[dimension])
            const newOperand = {
                idx:props.idx,
                isSelected:true,
                visualName:viewName,
                opType:props.opType,
                dimensionValue:newData.map(item=> item[dimension]),           
                legendValue:[dataKey],
                metricValue:newData.map(item=> item[dataKey]),
                dimension:dimension,
                metric:metric,
                legend:legend,
                data:newData.map(item=> ({[dimension]:item[dimension],[dataKey]:item[dataKey]}))
            }      
            props.setOperandsHandler(newOperand)

        }
        }    
        

    //use ternary operator to differenciate chart in creation or composition 
    const lines = labels.map(
        (item,idx)=>
        <Line
            key={item} 
            type="monotone" 
            name={item}
            dataKey={item} 
            stroke={props.opType=="Constant Value"?"none":props.palette[idx]}
            strokeWidth={opacity[item]}
            dot={{stroke:props.palette[idx],r:3,onClick:props.compared && (props.opType=="Constant Value" || props.opType=="Mark")  ?handleMouseClickonDot:()=>{}}}
            activeDot={false}
        />
        )

    return(
        <ResponsiveContainer aspect={2}  width={props.items>1?"100%":"50%"}>
            <LineChart
            data={newData}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={dimension} />
                <YAxis />
                <Tooltip />
                {props.opType=='Constant Value'?<p></p>:<Legend onClick={props.compared && props.opType=="Legend Label"?handleClickonLegend:()=>{}}/>}
                {lines}
                <ReferenceDot r={10} fill="black" x={newDot.x} y={newDot.y} stroke="none"/>
                
            </LineChart>
        </ResponsiveContainer>

    )
}


// data format

const data=[
    {
        day:"11-01",
        Comfort: 4000,
        CityCab: 1700,
        Smart: 2400},
    {
        day:"11-02",
        Comfort: 3000,
        CityCab: 1400,
        Smart: 2200},
    {
        day:"11-03",
        Comfort: 2000,
        CityCab: 1200,
        Smart: 2900},
    {
        day:"11-04",
        Comfort: 2800,
        CityCab: 1400,
        Smart: 1200},
    {
        day:"11-05",
        Comfort: 3500,
        CityCab: 2400,
        Smart: 1800}                    

]


const dataA=[
    {
        day:"11-01",
        metrics:{
            Comfort: 4000,
            CityCab: 1700,
            Smart: 2400
        }
    },
    {
        day:"11-02",
        metrics:{
            Comfort: 3000,
            CityCab: 1400,
            Smart: 2200},
        },        
    {
        day:"11-03",
        metrics:{
            Comfort: 2000,
            CityCab: 1200,
            Smart: 2900
        }       
    },
    {
        day:"11-04",
        metrics:{
            Comfort: 2800,
            CityCab: 1400,
            Smart: 1200},
        }   ,           

    {
        day:"11-05",
        metrics:{
            Comfort: 3500,
            CityCab: 2400,
            Smart: 1800
        },        

    }                    

]