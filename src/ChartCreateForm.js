import React, { useState } from 'react'
import { Button, Form, Label} from 'semantic-ui-react'


// works to do: clear dropdown after submit, alert incomplete submit


export default function ChartCreateForm(props){


    // ?? how to clear dropdown after submit https://codesandbox.io/s/white-leftpad-q6re3?file=/src/Fun.jsx:994-1017

    // const dimensionOptions =props.data[0]

    // set alertMessage
    const [alertMessage,setAlertMessage] = useState("")
    
    const dimensionOptions = props.dimensionOptions
    const metricOptions = props.metricOptions
    const chartTypeOptions = props.chartTypeOptions
    const legendOptions = dimensionOptions.slice()
    legendOptions.push({
        key:'None',
        text:'None',
        value:'None'
    })
    const handleSubmit =(event)=>{
        if(props.numVisuals>7){
            const message = <Label basic color='red' pointing='left'>You can only create 8 visualizations</Label>
            setAlertMessage(message)
            setTimeout(() => {setAlertMessage("")}, 2000)
            return 
        }
        const form = document.forms.createView;
        // get dimension value, need to fix default value when submiting
        const dimension = form.getElementsByClassName('field')[0].getElementsByClassName('ui fluid selection dropdown').dimension.getElementsByClassName('divider text')[0].innerHTML
        // get metric value, need to fix default value when submiting
        const metric = form.getElementsByClassName('field')[1].getElementsByClassName('ui fluid selection dropdown').metric.getElementsByClassName('divider text')[0].innerHTML
        // get metric value, need to fix default value when submiting
        const legend = form.getElementsByClassName('field')[2].getElementsByClassName('ui fluid selection dropdown').legend.getElementsByClassName('divider text')[0].innerHTML
        // get chartType value, need to fix default value when submiting
        const chartType = form.getElementsByClassName('field')[3].getElementsByClassName('ui fluid selection dropdown').chartType.getElementsByClassName('divider text')[0].innerHTML
        // get viewName
        const viewName = form.viewName.value
        const newVisual = {chartType,viewName,dimension,metric,legend}
        props.clickHandler(newVisual)
        form.viewName.value = ""

    }

    return(
        <Form name="createView" onSubmit={handleSubmit}>
            <Form.Select
                    fluid
                    selection
                    label='Dimension'
                    name='dimension'
                    options={dimensionOptions}
                />
            <Form.Select
                    fluid
                    label='Metric'
                    name='metric'
                    options={metricOptions}
                    // onChange={handleSubmit}    
                />
            <Form.Select
                    fluid
                    label='Legend'
                    name='legend'
                    options={legendOptions}     
                />                  
            <Form.Select
                    fluid
                    label='Chart Type'
                    name='chartType'
                    options={chartTypeOptions}     
                />        
            <Form.Field>
            <label>Chart Title</label>
            <input placeholder='View Name' name='viewName'/>
            </Form.Field>    
            <Button type='submit' >Create</Button>
            {alertMessage}
        
        </Form>
    )

}

