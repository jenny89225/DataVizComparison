import React, { useState } from "react";
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,Legend,Cell
} from "recharts";


export default function NewAreaChart(props){
    
    const{chartType,viewName,dimension,metric,legend} = props.activeCanva
    
    const newData = props.data.slice()
    const labels = Object.keys(newData[0]).slice(1)

    // set stroke width to 3
    const [color, setColor] = useState(labels.reduce((labels,curr,idx)=> (labels[curr]=props.palette[idx],labels),{}));

    // set category hide or show
    const [catShow,setCatShow] = useState(labels.reduce((labels,curr)=> (labels[curr]=props.showLegend,labels),{}))

    
    const handleMouseClickonBar = (entry, index) => {
        const dataKey = entry.tooltipPayload[0].name
        const idx = labels.indexOf(entry.tooltipPayload[0].name)
        props.setActiveIndex(index);
        props.setActiveBar(idx);
        const xValue = entry.payload[dimension]
        const legendVal = props.opType==="Constant Value"? "None":dataKey
        const dimensionVal = props.opType==="Constant Value"? "None":xValue
        const newOperand ={
            idx:props.idx,   
            isSelected:true,         
            visualName:viewName,
            opType:props.opType,
            dimensionValue:[dimensionVal],           
            legendValue:[legendVal],
            metricValue:[entry.value],
            dimension:dimension,
            metric:metric,
            legend:legend,
            data:[{[dimension]:dimensionVal,[legendVal]:entry.value}]
        }
        props.setOperandsHandler(newOperand)
        }
    
    //Set operands for legend label
    const handleClickonLegend = (event) =>{


        const { dataKey } = event
        const op = catShow[dataKey]
        if(op){
            setCatShow({ ...catShow, [dataKey]:false});
            setColor({ ...color, [dataKey]: props.palette[labels.indexOf(dataKey)] });
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
            setColor({ ...color, [dataKey]: "#FF2400" });
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
    const areas = labels.map(
        (item,idx)=>
        <Area
            key={item} 
            type="monotone" 
            name={item}
            dataKey={item} 
            fill={color[item]}
            stroke={color[item]}
            onClick={(props.opType=="Constant Value" || props.opType=="Mark")?handleMouseClickonBar:null}
       >
          { (props.opType=="Constant Value" || props.opType=="Mark")?
            newData.map((entry, index) => (
            <Cell
              cursor="pointer"
              fill={index === props.activeIndex & idx === props.activeBar ? "#FF2400" : props.palette[idx]}
            />
          )):null}
        </Area>
        )


    return(
        <ResponsiveContainer aspect={2}  width={props.items>1?"100%":"70%"}>
            <AreaChart
            
            data={newData}
            margin={{top: 5,right: 30,left: 20,bottom: 5,}}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={dimension} />
                <YAxis />
                <Tooltip />
                {props.opType=='Constant Value'?
                <p></p>:<Legend onClick={props.compared && props.opType=="Legend Label"?handleClickonLegend:()=>{}}/>}
                {areas}
            </AreaChart>
        </ResponsiveContainer>

    )
}

