import React, { Component, useState } from 'react'
import { Container,Header,Divider } from 'semantic-ui-react'



export default function Intro(props){

  
return(
  <div>
    <Container fluid>
        <Header as='h1' textAlign='center'>Data Visualization comparison</Header>
        <p>{content}</p>
        <p></p>
    </Container>
    <Divider />
  </div>
)

}


const content = ['Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus etmagnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massaquis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.']

