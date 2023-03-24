import React, { useState,useEffect} from "react";
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

    // set color to every bars
    const [color, setColor] = useState(labels.reduce((labels,curr,idx)=> (labels[curr]=props.palette[idx],labels),{}));

    // set category hide or show
    const [catShow,setCatShow] = useState(labels.reduce((labels,curr)=> (labels[curr]=props.showLegend,labels),{}))


    // // active bar idx
    // const [activeIndex, setActiveIndex] = useState(-1);
    // // active bar datak
    // const [activeBar, setActiveBar] = useState(-1);
    
    const handleMouseClickonBar = (entry, index) => {

        // make sure result chart will not re-render again
        props.safetyCheckHandler(false)
        
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
        // make sure result chart will not re-render again
        props.safetyCheckHandler(false)

        const { dataKey } = event
        const op = catShow[dataKey]
        if(Object.keys(color).some(k => color[k]==="#FF2400")){
            return
        }

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
    const bars = labels.map(
        (item,idx)=>
        <Bar
            key={item} 
            type="monotone" 
            name={item}
            dataKey={item} 
            fill={color[item]}
            onClick={(props.opType=="Constant Value" || props.opType=="Mark")?handleMouseClickonBar:null}
       >
          { (props.opType=="Constant Value" || props.opType=="Mark")?
            newData.map((entry, index) => (
            <Cell
              cursor="pointer"
              fill={index === props.activeIndex & idx === props.activeBar ? "#FF2400" : props.palette[idx]}
            />
          )):null}
        </Bar>
        )
    // re-create legend width when refreshing operands
    useEffect(() => {
        setColor(labels.reduce((labels,curr,idx)=> (labels[curr]=props.palette[idx],labels),{}))

    }, [props.clear]);



    return(
        <ResponsiveContainer aspect={2}  width={props.items>1?"100%":"80%"}>
            <BarChart
            
            data={newData}
            margin={{top: 3,right: 15,left: 15,bottom: 3,}}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={dimension} />
                <YAxis label={{ value: metric, angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)} />
                {props.opType=='Constant Value'?
                <p></p>:<Legend onClick={props.compared && props.opType=="Legend Label"?handleClickonLegend:()=>{}}/>}
                {bars}
            </BarChart>
        </ResponsiveContainer>

    )
}

