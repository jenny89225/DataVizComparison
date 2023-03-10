import React, { useState, useCallback } from "react";
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
// Use ternary to hide legend when legend is none 

export default function NewLineChart(props){
    const{chartType,viewName,dimension,metric,legend} = props.activeCanva
    
    const newData = props.data.slice()
    const labels = Object.keys(newData[0]).slice(1)
    
    // set stroke width to 3
    const allOpacity = labels.reduce((labels,curr)=> (labels[curr]=2,labels),{})
    const [opacity, setOpacity] = useState(allOpacity);
    // const allOperands = labels.reduce((labels,curr)=> (labels[curr]={show:false,code:""},labels),{})

    // set selected dot
    const [selectedDot, setSelectedDot] = useState({ x: "11-04", y: 1200 });

    // set showOperands
    const operands = labels.reduce((labels,curr)=> (labels[curr]=false,labels),{})
    const [operand,setOperand] = useState(operands)

    // const [operands,setOperands] = useState({
    //     Comfort: {show:false,code:""},
    //     CityCab:{show:false,code:""} ,
    //     Smart:{show:false,code:""} ,
    //   })


    // const handleMouseEnter = useCallback(
    //     (o) => {
    //       const { name } = o;
    //       setOpacity({ ...opacity, [name]: 10 });
    // },[opacity, setOpacity]
    // );
    
    // const handleMouseLeave = useCallback(
    //     (o) => {

    //     const { name } = o;
    //     setOpacity({ ...opacity, [name]: 1 });
    // },[opacity, setOpacity]
    // );

    // const handleMouseClickonLine = (event) =>{
        
    // const name = event.name
    // const op = operand[name]
    // if(op){
    //     setOperand({ ...operand, [name]:false});
    //     setOpacity({ ...opacity, [name]: 2 });
        
    // }else{
    //     setOperand({ ...operand, [name]:true });
    //     setOpacity({ ...opacity, [name]: 10 });
    // }
    // }

    // const handleMouseClickonDot = (event) =>{
    //     const name = event.name
    //     const op = operand[name]
    //     if(op){
    //         setOperand({ ...operand, [name]:false });
    //         setDotSize({ ...dotSize, [name]: 2 });
            
    //     }else{
    //         setOperand({ ...operand, [name]:true});
    //         setDotSize({ ...dotSize, [name]: 5 });
    //     }
    //     }

    const handleMouseClickonDot = (event) =>{
        console.log(event)
        const { cx, cy, stroke, payload, value,color} = event
        {}

        // const name = payload.dataKey
        // const op = operand[name]
        // if(op){
        //     setOperand({ ...operand, [name]:false });
        //     setDotSize({ ...dotSize, [name]: 2 });
            
        // }else{
        //     setOperand({ ...operand, [name]:true});
        //     setDotSize({ ...dotSize, [name]: 5 });
        // }
        }        
    const CustomizedDot = (props) => {
        
        const { cx, cy, stroke, payload, value,color} = props;
        // console.log(props)
        
        if (value > 2000 ) {
            return (
            <svg x={cx - 4} y={cy - 4} width={8} height={8} fill="white">
                <g transform="translate(4 4)">
                <circle r="4" fill="red" />
                <circle r="2" fill="white" />
                </g>
            </svg>
            );
        }
        return (
            <svg x={cx - 4} y={cy - 4} width={8} height={8} fill="white">
                <g transform="translate(4 4)">
                <circle r="4" fill={color} />
                <circle r="2" fill="white" />
                </g>
            </svg>
            );
        };     
               
    //use ternary operator to differenciate chart in creation or composition 
    const lines = labels.map(
        (item,idx)=>
        <Line
            key={item} 
            type="monotone" 
            name={item}
            dataKey={item} 
            stroke={props.palette[idx]}
            // stroke="none"
            // onMouseEnter={handleMouseEnter}
            // onMouseLeave={handleMouseLeave}
            // strokeDasharray={dash[item]}
            strokeWidth={opacity[item]}
            // onClick={props.compared?handleMouseClickonLine:()=>{}}
            // dot={{stroke:props.palette[idx],r:dotSize[item]}}
            // dot={<CustomizedDot color={props.palette[idx]} />}
            // dot={{onClick:handleMouseClickonDot}}
        />
        )



    return(
        <ResponsiveContainer aspect={2} minWidth='50'>
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
                {/* <Tooltip /> */}
                {legend=='None'?<p></p>:<Legend />}
                {lines}
                <ReferenceDot r={10} fill="red" xAxisId={185.75} yAxisId={139.230078125} stroke="none"/>
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