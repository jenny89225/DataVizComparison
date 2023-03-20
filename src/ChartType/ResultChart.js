import React, { useState, useCallback } from "react";
import { Button,Grid, GridRow} from 'semantic-ui-react'
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
import FileSaver from "file-saver";
import { useCurrentPng } from "recharts-to-png";

// To do: custom tooltip for result chart, how to implement other chart types, remove dimension value when is constants
// how to decide chart type???
// explode composition will cause a lot of spaces between responsive container

export default function ResultChart(props){
    // useCurrentPng usage (isLoading is optional)
    const [getPng, { ref, isLoading }] = useCurrentPng();

    const handleDownload = useCallback(async () => {
        const png = await getPng();
        // Verify that png is not undefined
        if (png) {
          // Download with FileSaver
          FileSaver.saveAs(png, 'myChart.png');
        }
      }, [getPng]);
    
    const handleAddNewChart = () => {
       const newChart =  {
        chartType:'Line Chart',
        viewName:`The result of ${props.op}`,
        dimension:props.dimension,
        metric:'population',
        legend:props.legendName,
        is_composed:true,
        data: props.newData
    }
        props.clickHandler(newChart)
        console.log(newChart)
        
    }

    let chart = <h4></h4>
    const lines = props.legends.map((group,idx)=><Line name={group} type="monotone" dataKey={group} stroke={props.palette[idx+3]}/>) 
    if(props.isSafe && props.op!=="Decomposition-explode"){
        chart = (
            <ResponsiveContainer aspect={2} minWidth='20' width="60%" >
            <LineChart
            ref={ref}
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
                <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                {lines}
                <Legend/>
            </LineChart>
            </ResponsiveContainer>
        )
    }else if(props.isSafe && props.op==="Decomposition-explode"){
        chart= lines.map(i=>

            // <ResponsiveContainer aspect={2} minWidth='20' width="70%" style={{margin:0}}>
            <LineChart
            ref={ref}
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
                <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                {i}
                <Legend/>
            </LineChart>
            // </ResponsiveContainer>
        )

    }

    return(
        <>
        <Grid>
        <Grid.Row centered>
            <h3>The result of {props.op}</h3>
        </Grid.Row>
        <Grid.Row centered>
        {chart}
        </Grid.Row>
        <Grid.Row centered>
            <Button.Group size="tiny">
                <Button size="tiny" onClick={handleAddNewChart}>Add chart as new view</Button>
                <Button size="tiny" onClick={handleDownload}>{isLoading ? 'Downloading...' :"Save Image"}</Button>
                <Button size="tiny" onClick={props.handleClickonRefreshResult}>Clear Result</Button>
            </Button.Group>
        </Grid.Row>                            
        </Grid>
        
        
        {/* <Button onClick={handleDownload}>{isLoading ? 'Downloading...' : 'Download Chart'}</Button> */}
        </>
    )
}