import React, { useState, useCallback } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from "recharts";


export default function NewBarChart(props){
    
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
        console.log(event)
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
    
    // active bar idx
    const [activeIndex, setActiveIndex] = useState(0);
    // active bar datak
    const [activeBar, setActiveBar] = useState("");
    
    const handleClick = useCallback(
        (entry, index) => {
        setActiveIndex(index);
        setActiveBar(entry.tooltipPayload[0].name)
        },
        [setActiveIndex]
    );

    
    const test = props.data.map(i => ({day:i.day,Comfort:i.Comfort}))

    //use ternary operator to differenciate chart in creation or composition 
    const bars = labels.map(
        (item,idx)=>
        
        <Bar
            key={item} 
            type="monotone" 
            name={item}
            dataKey={item} 
            fill={props.palette[idx]}
            strokeWidth={opacity[item]}
            onClick={handleClick}
            // fill={{stroke:props.palette[idx],r:3,onClick:props.compared && (props.opType=="Constant Value" || props.opType=="Mark")  ?handleMouseClickonDot:()=>{}}}
        >
    
          {
            newData.map((entry, index,key) => (
            // console.log(key)

            <Cell
            //   cursor="pointer"
              fill={index === activeIndex ? "#82ca9d" : props.palette[idx]}
              key="Comfort"
              dataKey="Comfort"
            />
          ))}
        </Bar>
        )

    return(
        <ResponsiveContainer aspect={2}  width={props.items>1?"100%":"50%"}>
            <BarChart
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
                {bars}
            </BarChart>
        </ResponsiveContainer>

    )
}

