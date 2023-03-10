import React, { Component, useState } from 'react'


// default operands in Interface
const [operands,setOperands] = useState(
    [
        {idx:0,isSelected:false},
        {idx:1,isSelected:false},
        {idx:2,isSelected:false},
        {idx:3,isSelected:false},
        {idx:4,isSelected:false}       
    ]
)

// To do: need to change legend value into list 

// wrong format
operands_entire_chart = [{
    idx:0,
    isSelected:true,
    opType:"Entire Chart",
    viewName:'daily taxi population',
    dimension:'day',
    metric:'population',
    legend:'company',
    dimensionValue:['11-01', '11-02', '11-03', '11-04', '11-05'], 
    metricValue:[undefined, undefined, undefined, undefined, undefined], 
    legendValue:['Comfort', 'CityCab', 'Smart'],
    aggfun:"sum",
    
}
]
operands_legend_value = [        
    {
        idx:0,
        isSelected:true,
        opType:"Legned Label",
        viewName:'daily taxi population',
        dimension:'day',
        metric:'population',
        legend:'company',
        dimensionValue:['11-01', '11-02', '11-03', '11-04', '11-05'], 
        metricValue:[1700, 1400, 1200, 1400, 2400], 
        legendValue:['CityCab'],
        aggfun:"sum",
    }]

operands_constant_value = [        
    {
        idx:0,
        isSelected:true,
        opType:"Constant Value",
        viewName:'daily taxi population',
        dimension:'day',
        metric:'population',
        legend:'company',
        dimensionValue:['None'], 
        metricValue:[2200], 
        legendValue:["None"],
        aggfun:"sum",
    }]

operands_mark = [        
    {
        idx:0,
        isSelected:true,
        opType:"Mark",
        viewName:'daily taxi population',
        dimension:'day',
        metric:'population',
        legend:'company',
        dimensionValue:['11-03'], 
        metricValue:[1200], 
        legendValue:"CityCab",
        aggfun:"sum", // ? no use so far
    }]

    