import React, { Component, useState } from 'react'
import { Container,Accordion, Icon, Segment,Grid,Image,Button,Dropdown, ButtonGroup} from 'semantic-ui-react'
import UploadDataset from './UploadDataset'
import ComparisonEditing from './ComparisonEditing'
import ChartEditing from './ChartEditing'
import Intro from './Intro'


const palette = ['#5E67C2',"#6daba9","#C067BC","#FF719F","#FF947B","#00A1EC","#ff7063","#f3f702","#00D2E9","#BF464D",
'#FED766','#FE4A49','#009FB7','#804674','#A86464','#00FF00','#AA77FF','#A84448','#F7C04A','#539165','#C04A82','#3E54AC','#D70040']
// const palette = [
//     'red',
//     'orange',
//     'yellow',
//     'olive',
//     'green',
//     'teal',
//     'blue',
//     'violet',
//     'purple',
//     'pink',
//     'brown',
//     'grey',
//     'black',]


export default function Interface(props){

    // the composition result should sent to another canva

    const [data,setData]=useState(rawData)
    const updateData = (newData)=>{
        setData(newData)
    }

    // show default tab 
    const[activeIndex,setActiveIndex] = useState(1)
    const handleClick = (e, titleProps) => {
        const { index } = titleProps
        const newIndex = activeIndex === index ? -1 : index
        setActiveIndex(newIndex)
    }

    // store all visual properties <- comparison component also need this 
    //maybe need to add iscomposed to differenciate saved from compose result??
    const [visuals,setVisuals] = useState(
        [
            {chartType:'Line Chart',viewName:'daily taxi population',dimension:'day',metric:'population',legend:'company',aggfunc:"sum"},
            {chartType:'Area Chart',viewName:'daily taxi revenue',dimension:'day',metric:'revenue',legend:'company',aggfunc:"sum"},
            {chartType:'Bar Chart',viewName:'taxi revenue by type',dimension:'type',metric:'revenue',legend:'company',aggfunc:"sum"}
    ])


    //let child componet update visuals
    const clickHandler = (newVisual) => {
        // console.log("clickHandler",newVisual)
        if(Array.isArray(newVisual)){
            setVisuals(newVisual)
        }else{
        // push value first, didn't rerender not sure it's ok to do that
            visuals.push(newVisual)
            const updatedVisuals = visuals.slice()
            setVisuals(updatedVisuals)
        }

    }

    // store selected operand properties 
    const [operands,setOperands] = useState(
        [{idx:0,isSelected:false},{idx:1,isSelected:false},{idx:2,isSelected:false},{idx:3,isSelected:false},{idx:4,isSelected:false}
            // {
            //     opType:"Legned Label",
            //     viewName:'daily taxi population',
            //     dimension:'day',
            //     metric:'population',
            //     legend:'company',
            //     dimensionValue:"", // if it's all legend group
            //     metricValue:"", // if it's all legend group
            //     legendValue:"Comfort",
            //     aggfun:"sum",
            //     data:[
            //         { day:"11-01", Comfort: 4000,},
            //         { day:"11-02", Comfort: 3000,},
            //         { day:"11-03", Comfort: 2000,},
            //         { day:"11-04", Comfort: 2800,},
            //         { day:"11-05", Comfort: 3500,}   
            //     ]
            // },
            // {
            //     opType:"Legned Label",
            //     viewName:'daily taxi population',
            //     dimension:'day',
            //     metric:'population',
            //     legend:'company',
            //     dimensionValue:"", // if it's all legend group
            //     metricValue:"", // if it's all legend group
            //     legendValue:"Smart",
            //     aggfun:"sum",
            //     data:[
            //         { day:"11-01", Smart: 2400},
            //         { day:"11-02", Smart: 2200},
            //         { day:"11-03", Smart: 2900},
            //         { day:"11-04", Smart: 1200},
            //         { day:"11-05", Smart: 1800}    
            //     ]
            // }            
        ]
    )

    // store selected operator
    const [operator,setOperator]=useState({
        arity:null,
        item:2,
        name:null,
        func:null,
    })

    //let child component update operands
    const setOperandsHandler = (slctOp) => {
        let newArr = [...operands]
        newArr[slctOp.idx] = slctOp
        // console.log(newArr)
        setOperands(newArr)
        // console.log(slctOp)
    }    

    //let child component update operator
    const setOperatorHandler = (slctOper) => {
        setOperator(slctOper)
    }    

    // if isSafe===true, then render result
    const[isSafe,setIsSafe]=useState(false)

    // let child component update isSafe
    const safetyCheckHandler = (isSafe) =>{
        setIsSafe(isSafe)
    }

    // Result should be display or not
    const [resultActive,setResultActive] = useState(false)
    // let child component update resultActive
    const resultActiveCheckHandler = (isActive) =>{
        setResultActive(isActive)
        // console.log("isActive",isActive)
        // console.log("resultActive",resultActive)
    }

    // let child component refresh resultActive & isSafe
    const handleClickonRefreshResult = () =>{
        setResultActive(false)   
        safetyCheckHandler(false)
    }


    return(
    <div>
        <Container style={{ padding: '1em 0em' }}>
            <Intro/>
            <Accordion>
                <Accordion.Title
                active={activeIndex === 0}
                index={0}
                onClick={handleClick}
                >
                <Icon name='dropdown' />
                Upload Dataset
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 0}>
                    <UploadDataset 
                        updateData={updateData} 
                        data={data}
                        setVisuals={setVisuals}
                    />     
                </Accordion.Content>
                <Accordion.Title
                active={activeIndex === 2}
                index={2}
                onClick={handleClick}
                >
                <Icon name='dropdown' />
                Create Visualizations 
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 2}>
                    <Grid>
                        <ChartEditing 
                            rawData={data} 
                            palette={palette} 
                            visuals={visuals} 
                            clickHandler={clickHandler}
                        />
                    </Grid>
                </Accordion.Content>
                <Accordion.Title
                active={activeIndex === 1}
                index={1}
                onClick={handleClick}
                >
                <Icon name='dropdown' />
                Compose Views/Operands for comparison
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 1}>
                    <Segment.Group horizontal>
                        <ComparisonEditing 
                            visuals={visuals}
                            rawData={data} 
                            palette={palette}
                            operands={operands}
                            operator={operator}
                            setOperandsHandler={setOperandsHandler}
                            setOperatorHandler={setOperatorHandler}
                            safetyCheckHandler = {safetyCheckHandler}
                            isSafe={isSafe}
                            resultActive={resultActive}
                            resultActiveCheckHandler={resultActiveCheckHandler}
                            handleClickonRefreshResult={handleClickonRefreshResult}
                            clickHandler={clickHandler}
                        />
                    </Segment.Group>
                </Accordion.Content>
            </Accordion>
        </Container>
    </div>
    )

}


const rawData = [
    {day:"11-01",type:"new",company:"Comfort",population:4000,revenue:500000},
    {day:"11-02",type:"new",company:"Comfort",population:3000,revenue:610000},
    {day:"11-03",type:"old",company:"Comfort",population:2000,revenue:560000},
    {day:"11-04",type:"old",company:"Comfort",population:2800,revenue:540000},
    {day:"11-05",type:"new",company:"Comfort",population:3500,revenue:530000},
    {day:"11-01",type:"new",company:"CityCab",population:1700,revenue:310000},
    {day:"11-02",type:"new",company:"CityCab",population:1400,revenue:250000},
    {day:"11-03",type:"old",company:"CityCab",population:1200,revenue:210000},
    {day:"11-04",type:"old",company:"CityCab",population:1400,revenue:240000},
    {day:"11-05",type:"new",company:"CityCab",population:2400,revenue:480000},    
    {day:"11-01",type:"new",company:"Smart",population:2400,revenue:360000},
    {day:"11-02",type:"new",company:"Smart",population:2200,revenue:370000},
    {day:"11-03",type:"old",company:"Smart",population:2900,revenue:440000},
    {day:"11-04",type:"old",company:"Smart",population:1200,revenue:140000},
    {day:"11-05",type:"new",company:"Smart",population:1800,revenue:190000},    
]


