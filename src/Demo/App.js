import './App.css';
import {useState, useEffect} from 'react';
import LineTypeChart from './LineTypeChart';
import ExplodeComposition from './ExplodeChart';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

function App() {
  const [backenddata, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/test/')
      .then(res => res.json())
      .then(backenddata => setData(backenddata.data));
  })

  const data = [
    {
      day: "11-01",
      Comfort: 4000,
      CityCab: 2400,
      Smart: 2400
    },
    {
      day: "11-02",
      Comfort: 3000,
      CityCab: 1398,
      Smart: 2210
    },
    {
      day: "11-03",
      Comfort: 2000,
      CityCab: 9800,
      Smart: 2290
    },
    {
      day: "11-04",
      Comfort: 2780,
      CityCab: 3908,
      Smart: 2000
    },
    {
      day: "11-05",
      Comfort: 1890,
      CityCab: 4800,
      Smart: 2181
    },
    {
      day: "11-06",
      Comfort: 2390,
      CityCab: 3800,
      Smart: 2500
    },
    {
      day: "11-07",
      Comfort: 3490,
      CityCab: 4300,
      Smart: 2100
    }
  ];
  

  const operandOptions = ['marks', 'values'];

  const [operand,setOperand] = useState(operandOptions[0])

  const operatorOptions = [
    'Union Composition',
    'Statistical Composition', 
    'Decomposition-explode',
    'Decomposition-extract'
  ];

  const [operator,setOperator] = useState(operatorOptions[0])

  const statfuncOptions = [
    '+',
    '-', 
    'min',
    'max'
  ];

  const [statfunc,setStatfunc] = useState(statfuncOptions[0])

  const [dimension,setDimension]=useState(Object.keys(data[0])[0])
  const [categories,setCategories]=useState(Object.keys(data[0]).slice(1))

  return (
    <div className="App">
      <header className='App-header'>

        <h1>VCA Demo</h1>
        <p>{dimension}</p>
        <p>{categories}</p>
        <div className='container'>
          <Dropdown 
            options={operandOptions} 
            onChange={(option)=>setOperand(option.label)} 
            value={operandOptions[0]} />
          <Dropdown 
            options={operatorOptions} 
            onChange={(option)=>setOperator(option.label)} 
            value={operatorOptions[0]}
            />
          {operator=='Statistical Composition'?
            <Dropdown 
              options={statfuncOptions} 
              onChange={(option)=>setStatfunc(option.label)} 
              value={statfuncOptions[0]} /> 
            : ""}

        </div>
        {operator=='Decomposition-explode'? 
          <ExplodeComposition operand={operand} data={data}/>  
          :<LineTypeChart operand={operand} operator={operator} statfunc={statfunc} data={data}/>}
      </header>
    </div>
  );
}

export default App;