import React, { useState} from "react";
import { Grid} from 'semantic-ui-react'
import ChartCanva from './ChartCanva'
import ChartCreateForm from './ChartCreateForm'

export default function ChartEditing(props) {

 
    //get raw data and array keys
    const checkData=props.rawData
    const keys = Object.keys(checkData[0])
    // const test = props.rawData.filter(x=>x.company==='Smart')
    

    // check data attribute is dimension/legend or metric?
    // if any attribut value is string then dimension else metric
    const dimensionKeys=[]
    for (let i=0;i<keys.length;i++){
        const key = keys[i]
        for (let j = 0; j < checkData.length; j++) {
            let attrValue = checkData[j][key]
            if(typeof attrValue === 'string' || attrValue instanceof String){
                dimensionKeys.push(key)
                break
            }
        }
    }


    const metricKeys = keys.filter(x=>!dimensionKeys.includes(x))

    // get dropdown option of dimension/legend
    const dimensions =[]
    dimensionKeys.map(i=>{
        dimensions.push({
            key:i,
            text:i,
            value:i
        })
    })
    
    // get dropdown option of metrics
    const metrics =[]
    metricKeys.map(i=>{
        metrics.push({
            key:i,
            text:i,
            value:i
        })
    })    


    //pass dimension,metric,legend options into chartcreateform component
    const [options,setOption] = useState({
        dimensionOptions:dimensions,
        metricOptions:metrics,
        chartTypeOptions:chartTypes

    })


    // update canvas when visuals state changed whether in adding or deleting
    // useEffect(() => {
    //     setOption({
    //         dimensionOptions:dimensions,
    //         metricOptions:metrics,
    //         chartTypeOptions:chartTypes    
    //     })
    // }, );

  

    return(
        <Grid.Row>
            <Grid.Column width={4}>
                <ChartCreateForm                     
                    clickHandler={props.clickHandler}
                    dimensionOptions={dimensions}
                    metricOptions={metrics}
                    chartTypeOptions={chartTypes}
                    numVisuals={props.visuals.length}
                />
            </Grid.Column>
            <Grid.Column width={12}>
                {props.visuals.length>0?
                <ChartCanva
                    clickHandler={props.clickHandler}
                    visuals={props.visuals} 
                    rawData={props.rawData} 
                    palette={props.palette}
                />
                :<p></p>
                }

            </Grid.Column>
        </Grid.Row>
    )
}


const chartTypes = [
    {
        key:'Bar Chart',
        text:'Bar Chart',
        value:'Bar Chart'
    },
    {
        key:'Line Chart',
        text:'Line Chart',
        value:'Line Chart'
    },
    // {
    //     key:'Scatter Plot',
    //     text:'Scatter Plot',
    //     value:'Scatter Plot'
    // },
    // {
    //     key:'Area Chart',
    //     text:'Area Chart',
    //     value:'Area Chart'
    // }   
]