import React, {useState,useEffect} from 'react'
import {Segment,Grid} from 'semantic-ui-react'
import ComparisonCanva from './ComparisonCanva';
import CompositionPanel from './CompositionPanel';
import Result from './Result';

// To-do

export default function ComparisonEditing(props){
    const allVisuals = props.visuals.slice()


    // use for update 
    const[isComposed,setIsComposed] = useState(false)

    // set charts into dropdown options
    const visualNames = allVisuals.map(value=>value.viewName)
    const visualOptions = []
    visualNames.map(i => visualOptions.push({
        key:i,
        text:i,
        value:i
    }))

    //pass chart,operand,operator options into chartcreateform component
    const [options,setOptions] = useState({
        operatorOptions:operatorOptions,
        operandOptions:operandOptions,
        visualOptions:visualOptions
    })

    // set number of charts
    const[items,setItems] = useState(2)

    // set legend to hide or show
    const [clear,setClear]= useState(true);

    // add number of charts
    const handleAdd= () =>{
        setItems(items+1);
    }
    // remove number of charts
    const handleRemove= () =>{
        setItems(items-1);
    }


    const selectedItems =[...Array(items).keys()].map(key=>
        <Grid.Column style={{padding:5}}>
            {props.visuals.length>0?
            <ComparisonCanva 
                visuals={props.visuals}
                rawData={props.rawData}
                palette={props.palette}
                options={options}
                items={items}
                itemIdx={key}
                setOperandsHandler={props.setOperandsHandler}
                operands={props.operands}
                operator={props.operator}
                isComposed={isComposed} 
                safetyCheckHandler={props.safetyCheckHandler}
                setClear={setClear}
                clear={clear}
            />:<p></p> }

        </Grid.Column>)
    


    // update options when newView created
    useEffect(() => {
    setOptions({
        operatorOptions:operatorOptions,
        operandOptions:operandOptions,
        visualOptions:visualOptions
    });
    }, [props.visuals]);

    // update operator when items change --> not sure is good to update here 
    useEffect(() => {
        const newOperator = {...props.operator}
        newOperator.item = items
        props.setOperatorHandler(newOperator)
        }, [items]);


    return(
        <Segment>
            <Grid>
                <Grid.Row centered width={14}>
                    <Grid.Column>
                        <CompositionPanel 
                            setItems={setItems} 
                            options={options} 
                            handleRemove={handleRemove} 
                            handleAdd={handleAdd} 
                            items={items}
                            // visuals={props.visuals}
                            safetyCheckHandler = {props.safetyCheckHandler}
                            operands={props.operands}
                            operator={props.operator}
                            setOperatorHandler={props.setOperatorHandler}
                            isComposed={isComposed}
                            setIsComposed={setIsComposed}
                            setClear={setClear}
                            clear={clear}
                        />
                    </Grid.Column>   
                </Grid.Row>
                <Grid.Row columns={items<3?items:3} centered>
                    {selectedItems}
                    <Result
                        operands={props.operands} 
                        operator={props.operator} 
                        isSafe={props.isSafe} 
                        palette={props.palette} 
                        resultActive={props.resultActive}
                        resultActiveCheckHandler={props.resultActiveCheckHandler}
                        handleClickonRefreshResult={props.handleClickonRefreshResult}
                        clickHandler={props.clickHandler}

                    />
                </Grid.Row>
            </Grid>
        </Segment>
    )
}


const operandOptions = [
    {
        key:'Entire Chart',
        text:'Entire Chart',
        value:'Entire Chart'

    },
    {
        key:'Constant Value',
        text:'Constant Value',
        value:'Constant Value'

    },
    {
        key:'Mark',
        text:'Mark',
        value:'Mark'

    },
    {
        key:'Legend Label',
        text:'Legend Label',
        value:'Legend Label'
    }

]

const operatorOptions = [
    {
        key:'Union-composition',
        text:'Union Composition',
        value:'Union Composition'
    },
    {
        key:'Statistical Composition',
        text:'Statistical Composition',
        value:'Statistical Composition'
    },
    {
        key:'Decomposition-explode',
        text:'Decomposition-explode',
        value:'Decomposition-explode'
    },
    {
        key:'Decomposition-extract',
        text:'Decomposition-extract',
        value:'Decomposition-extract'
    }    
]