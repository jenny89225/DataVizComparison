import React, { useState, useCallback } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { CustomTooltip } from "./CustomTooltip";
import './Charts.css'


export default function LineTypeChart(props) {
  const [opacity, setOpacity] = useState({
    Comfort: 2,
    CityCab: 2,
    Smart:2
  });
  const [operands,setOperands] = useState({
    isop1:true,
    op1:"",
    op2:""
  })

  const handleMouseEnter = useCallback(
    (o) => {
      const { name } = o;

      setOpacity({ ...opacity, [name]: 10 });
    },
    [opacity, setOpacity]
  );

  const handleMouseLeave = useCallback(
    (o) => {

      const { name } = o;
      setOpacity({ ...opacity, [name]: 1 });
    },
    [opacity, setOpacity]
  );

  const handleMouseClickonLine = (event) =>{
    if (props.operator!="Statistical Composition"){
      return
    }
    const name = event.name
    if (operands.isop1){
      if(operands.op2!=name){
        setOperands({ ...operands, ["isop1"]:false,["op1"]: name });
      }
    }else{
      if(operands.op1!=name){
        setOperands({ ...operands, ["isop1"]:true,["op2"]:name});
      }
    }
  }
  const removeOperands = () =>{
    setOperands({ ...operands, ["isop1"]:true,["op1"]: "",["op2"]: "" });
  }

  return (
    <div>
      <div className='container'>
        <p>isop1 {operands.isop1 ? "true":"false"}</p>
        <p>op1 {operands.op1}</p>
        <p>op2 {operands.op2}</p>
        <button className="refreshbtn" onClick={removeOperands}>Refresh Operands</button>
      </div>
      <LineChart
        width={750}
        height={400}
        data={props.data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
        >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        {props.operator!='Statistical Composition'? <Tooltip /> : ""}
        {props.operator=='Statistical Composition'? <Tooltip  content={<CustomTooltip operands={operands} operator={props.operator} statfunc={props.statfunc}/>}/>: ""}
        <Legend
        />
        <Line
          type="monotone"
          dataKey="CityCab"
          name="CityCab"
          stroke="#8884d8"
          // onMouseEnter={handleMouseEnter}
          // onMouseLeave={handleMouseLeave}
          onClick={handleMouseClickonLine}
          strokeWidth={opacity.CityCab}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="Comfort"
          name="Comfort"
          // onMouseEnter={handleMouseEnter}
          // onMouseLeave={handleMouseLeave}
          strokeWidth={opacity.Comfort}
          stroke="#82ca9d"
          onClick={handleMouseClickonLine}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="Smart"
          name="Smart"
          stroke="#82b8ca"
          // onMouseEnter={handleMouseEnter}
          // onMouseLeave={handleMouseLeave}
          strokeWidth={opacity.Smart}
          dot={false}
          onClick={handleMouseClickonLine}
          // activeDot={{ stroke: 'black', strokeWidth: 2, r: 5 }}
        />        
      </LineChart>
    </div>
  );
}
