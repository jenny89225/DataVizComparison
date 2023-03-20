import React, { Component, useState } from 'react'
import { Container,Header,Divider } from 'semantic-ui-react'



export default function Intro(props){

  
return(
  <div>
    <Container fluid>
        <Header as='h1' textAlign='center'>Data Visualization Comparison</Header>
        <p>{content}</p>
        <p></p>
    </Container>
    <Divider />
  </div>
)

}


const content = ['DataViz Comparison is a data comparison tool and provides data professions an interface to do ad-hoc comparison when visualizing the data.']

