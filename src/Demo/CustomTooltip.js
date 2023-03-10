export const CustomTooltip = (props) => {
    const { active, payload, label,operands,operator,statfunc} = props
    if (active && payload && payload.length && operands.op1 && operands.op2 && operator=='Statistical Composition') {
        const filteredpayload = payload.filter((item) => item.name == operands.op1 ||item.name == operands.op2 );
        const operand1 = filteredpayload.find(x => x.name === operands.op1).value
        const operand2 = filteredpayload.find(x => x.name === operands.op2).value
    
      return (
        <div className="custom-tooltip" style={{ display: "inline-block", padding: 10,backgroundColor:"#0F4C5C"}}>
          {statfunc=="+"?<p className="label">{`${label} : ${operand1+operand2}`}</p>:""}
          {statfunc=="-"?<p className="label">{`${label} : ${operand1-operand2}`}</p>:""}
          {statfunc=="min"?<p className="label">{`${label} : ${Math.min(operand1,operand2)}`}</p>:""}
          {statfunc=="max"?<p className="label">{`${label} : ${Math.max(operand1,operand2)}`}</p>:""}
          <div>
            {filteredpayload.map((pld) => (
              <div key={pld.dataKey+pld.value} className="custom-tooltip" style={{ display: "inline-block", padding: 10,backgroundColor:"#071E22"}}>
                <div className="custom-tooltip-value" style={{ color: pld.fill }}>{pld.value}</div>
                <div className="custom-tooltip-key" style={{ color: "gray" }}>{pld.dataKey}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };
  