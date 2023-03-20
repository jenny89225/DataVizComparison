// right now addtion

import {matrix,add,subtract,min,max} from 'mathjs'

// base on opType to convert metric value?

// compute result for statisticalComposition
// add 
function addition(opList){
    let res = opList[0].metricValue
    
    for(let i=1;i< opList.length;i++){
        res = add(res,matrix(opList[i].metricValue))

    }
    return res.valueOf()
}

// sub
function subtraction(opList){
    let res = opList[0].metricValue
    for(let i=1;i< opList.length;i++){
        res = subtract(res,matrix(opList[i].metricValue))
    }
    return res.valueOf()
}

// min
// ledgend label show min by different dimension value
function findMin(opList){
    let res = opList[0].metricValue
    for(let i=1;i< opList.length;i++){
        res = min([res,opList[i].metricValue], 0) 
    }
    return res.valueOf()
}

// min
// there will be problem to compare legend label with max? what to do?
function findMax(opList){
    let res = opList[0].metricValue
    for(let i=1;i< opList.length;i++){
        res = max([res,opList[i].metricValue], 0) 
    }
    return res.valueOf()
}


function statisticalComposition(operands,func){
    // copy operands, already filtered based on arity & item
    const newOperands = operands.slice()
    let res = 0
    // check opType and sum arry of Entire Chart"
    // for(let i=0;i<newOperands.length;i++){
    //     if(newOperands[i].opType=="Entire Chart"){
    //         // let sumMetricValue = newOperands[i].metricValue[0]

    //         // // console.log(sumMetricValue+newOperands[i].metricValue[1] )
    //         // for(let j=1;j<newOperands[i].metricValue.length;j++){
    //         //     sumMetricValue = add(sumMetricValue,matrix(newOperands[i].metricValue[j]))
    //         // }
            
    //         // newOperands[i].metricValue =  sumMetricValue.valueOf()
    //     }
    // }
    // console.log(newOperands)

    switch (func) {
        case '+':
            res = addition(newOperands)
            break;
        case '-':
            res = subtraction(newOperands)    
            break
        case 'min':
            res = findMin(newOperands)   
            break   
        case 'max':
            res = findMax(newOperands)   
            break                    
        default:
            console.log('can not recognize function');
            
        }

    return res
}

function unionComposition(operands){
    // copy operands, already filtered based on arity & item
    const newOperands = operands.slice()
    const dim =newOperands[0].dimension
    let newData =[]
    const union_legend = new Set(); // get unique legend labels
    for(let i=0;i<newOperands.length;i++){
        newData = newData.concat(newOperands[i].data)
        newOperands[i].legendValue.forEach(item => union_legend.add(item))
    }    
    // merge all legendlables data based on dimension values
    let res = {};
    newData.forEach(item => res[item[dim]] = {...res[item[dim]], ...item});
    res = Object.values(res);

    return [res,Array.from(union_legend),dim]

}

function extractComposition(operands){
    const newOperands = operands.slice()
    const dim =newOperands[0].dimension
    const res = newOperands[0].data
    const legend = newOperands[0].legendValue
    return [res,legend,dim]
}


function explodeComposition(operand){
    

    // copy operands, already filtered based on arity & item
    const newOperand = operand.slice()
    const res =newOperand[0].data
    const legends = newOperand[0].legendValue
    const dim = newOperand[0].dimension
    // console.log(newOperand)
    // console.log(newOperand.legendValue)
    return [res,legends,dim]

}

export {statisticalComposition,unionComposition,extractComposition,explodeComposition}


const dataA=[
    {
        day:"11-01",
        CityCab: 1800,
        Smart: 2400
    },  
    {
        day:"11-03",
        Smart: 2900,
        Comfort: 2000
    },
    {
        day:"11-04",
        Smart: 2400
    },
]

const dataB=[
    {
        day:"11-01",
        CityCab: 1800
    },
    {
        day:"11-02",
        CityCab: 1400
        },        
    {
        day:"11-03",
        Comfort: 2000,

    },
    {
        day:"11-04",
        Comfort: 4000,
    },
]