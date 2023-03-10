import React, {useState,useEffect} from 'react'
import {Dropdown,Button,Menu,Label,Icon, MenuItem} from 'semantic-ui-react'

// Todo: add arrow to indicate result on top after clicking compose, h
// handle duplicate situation! show alert?


// unary -> extract, explode
// binary,nary -> union, stats
// stats-> arithmatic function dropdown



export default function CompositionPanel(props){

    // set arity to control add canvas
    const[arity,setArity]=useState("Binary")
    const handleArity =(e, data)=>{
        setArity(data.value)
        const newOperator = {...props.operator}
        newOperator.arity = data.value
        props.setOperatorHandler(newOperator)        
    }

    // set composition operator to show other selections like arithmetic function
    const[composition,setComposition]=useState("")
    const handleComposition =(e, data)=>{
        setComposition(data.value)
        const newOperator = {...props.operator}
        newOperator.name = data.value
        props.setOperatorHandler(newOperator)
    }

    // set arithmetic function
    const[func,setFunc]= useState("")
    const handleFunc =(e, data)=>{
        setFunc(data.value)
        const newOperator = {...props.operator}
        newOperator.func = data.value
        props.setOperatorHandler(newOperator)
    }    
    // operator selection based on arity
    const operatorOptions = arity=="Unary"?unaryOperatorOptions:naryOperatorOptions

    // set alertMessage
    const [alertM,setAlertM] = useState("")

    // compose to do safety check 
    const handleSafetycheck = () =>{
        // check all properties of operator are selected
        const {arity,name,func} = props.operator
        if(!arity|| !name|| (name==="Statistical Composition" && !func)){
            props.safetyCheckHandler(false)
            const message = <Label basic color='red' pointing='left'> Please check operator selected</Label>
            setAlertM(message)
            setTimeout(() => {setAlertM("")}, 2000)
            return         
        }
        // check all properties of operator are selected
        // can not used is selected as condition will crash in some case
        const composedOperands = props.operands.slice(0,props.operator.item)


        // check all operands are same types
        if(composedOperands.find( v => v.opType !== props.operands[0].opType )){
            props.safetyCheckHandler(false)
            const message = <Label basic color='red' pointing='left'> Please check operands are same type</Label>
            setAlertM(message)
            setTimeout(() => {setAlertM("")}, 2000)
            return 
        }

        if(name!=="Decomposition-explode" && composedOperands.find(item => item.isSelected===false)){
            props.safetyCheckHandler(false)
            const message = <Label basic color='red' pointing='left'> Please check operands selected</Label>
            setAlertM(message)
            setTimeout(() => {setAlertM("")}, 2000)
            return 
        }
        
        // check whether operands are composable
        if(name!=="Decomposition-explode" && composedOperands.find( v => v.dimension !== props.operands[0].dimension )){
            props.safetyCheckHandler(false)
            // check dimension,send alert  
            const message = <Label basic color='red' pointing="left"> Please check same dimensions</Label>
            setAlertM(message)
            setTimeout(() => {setAlertM("")}, 2000)
        }else if(name!=="Decomposition-explode" && composedOperands.find( v => v.legend !== props.operands[0].legend)){
            props.safetyCheckHandler(false)
            // check legend,send alert 
            const message = <Label basic color='red' pointing="left"> Please check same legend</Label>
            setAlertM(message)
            setTimeout(() => {setAlertM("")}, 2000)
        }else if(name!=="Decomposition-explode" && composedOperands.find( v => v.aggfunc !== props.operands[0].aggfunc)){
            props.safetyCheckHandler(false)
            // check metrics need to differentiate count with other e.g. sum(),max(),
            // check metrics,alert not safe to compose
            const message = <Label basic color='red' pointing="left"> Please check same metrics</Label>
            setAlertM(message)
            setTimeout(() => {setAlertM("")}, 2000)
        }else{
            // sefe to compose
            props.safetyCheckHandler(true)
            const message = <Label pointing="left" color="blue"> <Icon name='arrow down'/> Result chart is at the bottom.</Label>
            setAlertM(message)
            setTimeout(() => {setAlertM("")}, 1500)

            // clear some dropdown selections
            setComposition("")
            setFunc("")
            props.setIsComposed(true)

        }
        

    }

    // update canvas when visuals state changed whether in adding or deleting
    useEffect(() => {
        if (arity=="Unary"){
            props.setItems(1)
        }else if(arity=="Binary"){
            props.setItems(2)
        }else{
            props.setItems(3) 
        }
    }, [arity]);


    return(
        <Menu fluid borderless>
        <Menu.Item header>Composition</Menu.Item>
        <Menu.Item>
        <Dropdown 
            placeholder='Select Arity' 
            options={ArityOptions}
            onChange={handleArity}
            />        
        </Menu.Item>
        {arity=="Nary"?       
        <Menu.Item>
            <Button.Group size='mini'>
                <Button
                    disabled={props.items === 3}
                    icon='minus'
                    size='tiny'
                    onClick={props.handleRemove}
                />
                <Button
                    disabled={props.items === 5}
                    icon='plus'
                    size='tiny'
                    onClick={props.handleAdd}
                />
            </Button.Group>
        </Menu.Item> : null
        }

        <Menu.Item>
            <Dropdown 
            placeholder='Select Operator' 
            options={operatorOptions}
            onChange={handleComposition}
            value={composition||""}
            />           
        </Menu.Item>
        {composition=='Statistical Composition'? 
        <Menu.Item>
            <Dropdown 
            placeholder='Arithmetic function' 
            options={ArithmeticOptions}
            onChange={handleFunc}
            value={func||""}
            />           
        </Menu.Item>:null}
        <Menu.Item onClick={handleSafetycheck}>Compose</Menu.Item>
        <Menu.Item>{alertM}</Menu.Item>
      </Menu>
      
    )

}

const naryOperatorOptions = [
    {
        key:'Union-composition',
        text:'Union Composition',
        value:'Union Composition'
    },
    {
        key:'Statistical Composition',
        text:'Statistical Composition',
        value:'Statistical Composition'
    }
]

const unaryOperatorOptions = [
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


const ArityOptions = [
    {
        key:'Unary',
        text:'Unary',
        value:'Unary'
    },
    {
        key:'Binary',
        text:'Binary',
        value:'Binary'
    },
    {
        key:'Nary',
        text:'Nary',
        value:'Nary'
    }   
]


const ArithmeticOptions = [
    {
        key:'+',
        text:'+',
        value:'+'
    },
    {
        key:'-',
        text:'-',
        value:'-'
    },
    {
        key:'min',
        text:'min',
        value:'min'
    },
    {
        key:'max',
        text:'max',
        value:'max'
    }         
]