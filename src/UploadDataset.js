import React, { Component, useState } from 'react'
import { Button, Segment, Input } from 'semantic-ui-react'
import DatasetTable from './DatasetTable';

// Need not hardcore input width

export default function UploadDataset(props){
  const [file, setFile] = useState();
  const [array, setArray] = useState(rawData);
  const [fileName,setFileName] = useState("Demo Data for Taxi Population")

  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFileName(e.target.files[0].name)
    setFile(e.target.files[0]);
  };

  const csvFileToArray = string => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");
    
    // remove empty row, need to change
    csvRows.pop()

    const array = csvRows.map(text => {
      text = text.replace(/(\r\n|\n|\r)/gm, "");
      const values = text.split(",");
      
      const obj = csvHeader.reduce((object, header, index) => {
        // need to redesign for date data
        if(!isNaN(parseFloat(values[index])) && !values[index].includes("-")){
          object[header] = parseFloat(values[index]) 
        }
        else if(!isNaN(parseInt(values[index])) && !values[index].includes("-")){
          object[header] = parseInt(values[index])   
        }else{
          object[header] = values[index];
        }
        return object;
      }, {});
      return obj;
    });

    setArray(array);
    props.updateData(array);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text);
      };

      fileReader.readAsText(file);
      // clear charts for default data
      props.setVisuals([])
    }
  };


  
return(
  <div>
    <Input 
      type={"file"}
      id={"csvFileInput"}
      accept={".csv"}
      onChange={handleOnChange}
      placeholder='Select CSV file' 
      style={{minWidth:"67em"}}
    /> 
    <Button floated='right' onClick={(e) => {handleOnSubmit(e)}}>Upload Datatset</Button>
    <h3 >{fileName}</h3>
    <DatasetTable array={array}/>
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


