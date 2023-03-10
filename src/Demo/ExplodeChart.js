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

//Use SynchronizedLineChart, LineChartAxisInterval

export default function ExplodeComposition(props) {
  const [opacity, setOpacity] = useState({
    Comfort: 1,
    CityCab: 1
  });


  return (
    <div>
      <LineChart
        width={750}
        height={200}
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
        <Line
          type="monotone"
          dataKey="CityCab"
          strokeOpacity={opacity.CityCab}
          stroke="#8884d8"
          activeDot={{ r: 8 }}
          dot={false}
        />
        {props.operand=='values'? <Tooltip /> : ""}
      </LineChart>
      <LineChart
        width={750}
        height={200}
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
        <Line
          type="monotone"
          dataKey="Comfort"
          strokeOpacity={opacity.Comfort}
          stroke="#82ca9d"
          dot={false}
        />
        {props.operand=='values'? <Tooltip /> : ""}      
      </LineChart>
      <LineChart
        width={750}
        height={200}
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
        <Line
          type="monotone"
          dataKey="Smart"
          strokeOpacity={opacity.Smart}
          stroke="#82b8ca"
          // onClick={handleMouseClick}
          dot={false}
        /> 
        {props.operand=='values'? <Tooltip /> : ""}       
      </LineChart>            
    </div>
  );
}
