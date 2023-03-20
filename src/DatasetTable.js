import React from 'react'
import { Table } from 'semantic-ui-react'


// To do: should show in pagination, deafult be 10 rows

export default function DatasetTable(props){

  const headerKeys = Object.keys(Object.assign({}, ...props.array));
  const shownRows = props.array.slice(0,10)
  const nfObject = new Intl.NumberFormat('en-US');

  return(
    <Table celled>
    <Table.Header>
      <Table.Row key={"header"}>
        {headerKeys.map((key) => (
              <Table.HeaderCell>{key}</Table.HeaderCell>
            ))}
      </Table.Row>
    </Table.Header>
    <Table.Body>
    {shownRows.map((item) => (
      <Table.Row key={item.id}>
              {Object.values(item).map((val) => (
                <Table.Cell>{typeof val !== 'string'?nfObject.format(val):val}</Table.Cell>
              ))}
      </Table.Row>
          ))}
    </Table.Body>
  </Table>
  )
} 



