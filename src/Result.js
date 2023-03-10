import React, { Component, useEffect, useState } from 'react'
import { Segment,Grid,Image,Button, GridRow,} from 'semantic-ui-react'
import {statisticalComposition,unionComposition,explodeComposition,extractComposition} from './operators.js'
import ResultChart from './ChartType/ResultChart.js'

export default function Result(props){

    // how to solve 2,3?
    // situation 1 exact operand type match
    // situation 2 entire chart/legend to constant
    // situation 3 entire chart/legend to mark

    let resList = []
    let legendName = ""
    let dimension = ""
    let newData = []
    let legends= [""]

    // execute composition if isSafe to compose
    if (props.isSafe){
        // To do: transform array of objects into array of matrices, need to based on optype
        const opFunc = props.operator.name;
        const composedOperands = props.operands.slice(0,props.operator.item)

        const legendLabel = composedOperands.map(
            (item)=> item.legendValue)
        // get legend name for chart
        legendName = `${mapping[props.operator.func]} of ${legendLabel.join(" and ")}`

        switch (opFunc) {
        case 'Statistical Composition':
            
            resList = statisticalComposition(composedOperands,props.operator.func)

            legends=[legendName]
            // get dimension names for chart
            // will have some problem if constant-legend label
            dimension=props.operands[0].dimension
            // get data to fit into result chart if not union?
            for(let i=0;i <props.operands[0].dimensionValue.length;i++){
                let row ={}
                row[dimension]=props.operands[0].dimensionValue[i]
                row[legendName] = resList[i]
                newData.push(row)
            }
            
            break;
        case 'Union Composition':
            resList = unionComposition(composedOperands)
            newData=resList[0]
            legends=resList[1]
            dimension=resList[2]
            break
        case 'Decomposition-extract':
            resList = extractComposition(composedOperands)
            newData=resList[0]
            legends=resList[1]
            dimension=dimension=resList[2]
            break;
        case 'Decomposition-explode':
            resList = explodeComposition(composedOperands)
            newData=resList[0]
            legends=resList[1]
            dimension=resList[2]
            break;
        default:
            console.log('no operator');
        }
        props.resultActiveCheckHandler(true)
    }

    const resChart = <ResultChart
    resultActive={props.resultActive}
    isSafe={props.isSafe}
    newData={newData} 
    legendName={legendName} 
    dimension={dimension}
    palette={props.palette}
    legends={legends}
    op={props.operator.name}
/>
    const res = (
    <Grid>
        <Grid.Row centered>
            <h3>The result of {props.operator.name}</h3>
        </Grid.Row>
        <Grid.Row centered>
            {resChart}
        </Grid.Row>
        <Grid.Row centered>
            <Button.Group size="tiny">
                <Button size="tiny">Add chart as new view</Button>
                {/* <Button size="tiny">Enable tooltip</Button> */}
                <Button size="tiny">Save Image</Button>
                <Button size="tiny" onClick={props.handleClickonRefreshResult}>Clear Result</Button>
            </Button.Group>
        </Grid.Row>                            
    </Grid>
    )

    return(
        <Segment textAlign='center'  >
            {props.isSafe?res:<h3>Please compose a operator and operands to get the result</h3>}
        </Segment>
    )

}


const mapping = {"+":"sum","-":"difference","min":"min","max":"max"}