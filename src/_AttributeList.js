import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

export default class AttributeList extends Component {
  state = { activeItem: 'dimension1' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
        <div>
            <Menu vertical>
                <Menu.Item header>Dimension</Menu.Item>
                <Menu.Item
                name='dimension1'
                active={activeItem === 'dimension1'}
                onClick={this.handleItemClick}
                />
                <Menu.Item
                name='dimension2'
                active={activeItem === 'dimension2'}
                onClick={this.handleItemClick}
                />
                <Menu.Item
                name='dimension3'
                active={activeItem === 'dimension3'}
                onClick={this.handleItemClick}
                />
            </Menu>
            <Menu vertical>
                <Menu.Item header>Metric</Menu.Item>
                <Menu.Item
                name='metric1'
                active={activeItem === 'metric1'}
                onClick={this.handleItemClick}
                />
                <Menu.Item
                name='metric2'
                active={activeItem === 'metric2'}
                onClick={this.handleItemClick}
                />
                <Menu.Item
                name='metric3'
                active={activeItem === 'metric3'}
                onClick={this.handleItemClick}
                />
            </Menu>            
        </div>

    )
  }
}