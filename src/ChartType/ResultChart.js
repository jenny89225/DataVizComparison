import React, { useState, useCallback } from "react";
import { Tab} from 'semantic-ui-react'
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

// To do: custom tooltip for result chart, how to implement other chart types, remove dimension value when is constants
// how to decide chart type???
// explode composition will cause a lot of spaces between responsive container

export default function ResultChart(props){

    let chart = <h4></h4>
    const lines = props.legends.map((group,idx)=><Line name={group} type="monotone" dataKey={group} stroke={props.palette[idx+3]}/>) 
    if(props.isSafe && props.op!=="Decomposition-explode"){
        chart = (
            <ResponsiveContainer aspect={2} minWidth='20' width="60%" >
            <LineChart
            data={props.newData}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={props.dimension} />
                <YAxis />
                <Tooltip />
                {lines}
                <Legend/>
            </LineChart>
            </ResponsiveContainer>
        )
    }else if(props.isSafe && props.op==="Decomposition-explode"){
        chart= lines.map(i=>

            // <ResponsiveContainer aspect={2} minWidth='20' width="70%" style={{margin:0}}>
            <LineChart
            syncId="anyId"
            data={props.newData}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            width={350} height={200}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={props.dimension} />
                <YAxis />
                <Tooltip />
                {i}
                <Legend/>
            </LineChart>
            // </ResponsiveContainer>
        )

    }

    return(
        <>
        {chart}
        </>
    )
}