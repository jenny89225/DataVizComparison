import React, { useState, useCallback } from "react";
import { Button,Grid,Input,Form,Label} from 'semantic-ui-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer ,
} from "recharts";
import FileSaver from "file-saver";
import { useCurrentPng } from "recharts-to-png";

// To do: custom tooltip for result chart, how to implement other chart types, remove dimension value when is constants
// how to decide chart type???
// explode composition will cause a lot of spaces between responsive container


export default function ResultChart(props){

    // handle chart name
    const [name,setName] = useState("")

    // set success message for adding chart
    const [successM,setSuccessM]= useState("")

    function handleNameChange(e) {
        // onChange(name, e.target.value);
        setName(e.target.value)

      }

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
    
    const handleAddNewChart = (e) => {
        const form = document.forms.addNewView
        form.view.value = ""
        const newLegendValue = Object.keys(props.newData[0]).filter(i=>i!==props.dimension)
        const newChart =  {
            chartType:'Line Chart',
            viewName: name===""?`The result of ${props.op}`:name,
            dimension:props.dimension,
            metric:props.metric,
            composed_legendValue: newLegendValue,
            composed_metricValue:props.newData.map(i => i[newLegendValue[0]]),
            composed_dimensionValue:props.newData.map(i => i[props.dimension]),
            legend:props.legend,
            is_composed:true,
            data: props.newData
        }
        props.clickHandler(newChart)

        const message = <Label basic color='blue' pointing='below'> 
        Successfully created. Please check in <strong>Create visualizations</strong> section</Label>
        setSuccessM(message)
        setTimeout(() => {setSuccessM("")}, 3000)
        // console.log("newChart",newChart)
        
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
        {/* <Input size='big' type='text' placeholder={`The result of ${props.op}`} /> */}
            <h3>The result of {props.op}</h3>
        </Grid.Row>
        <Grid.Row centered>
        {chart}
        </Grid.Row>
        <Grid.Row centered>{successM} </Grid.Row>
        <Grid.Row centered>
            
            <Form name="addNewView" onSubmit={handleAddNewChart}>
                <Input name="view" onChange={handleNameChange} type='text' placeholder='Edit Chart Name' />
                <Button type="submit" >Add as New Visualization</Button>
            </Form>
            <Button.Group size="tiny">
                <Button size="tiny" onClick={props.handleClickonRefreshResult}>Clear Result</Button>
                <Button size="tiny" onClick={handleDownload}>{isLoading ? 'Downloading...' :"Download Result"}</Button>
            </Button.Group>
        </Grid.Row>
                                   
        </Grid>
        </>
    )
}

