import React, { Component, Fragment } from 'react'
import { ContractBalance, SwitcheoHeader, SwitcheoGridBurnStatistics, SwitcheoGridChainStatistics, SwitcheoReChart } from './Components'

class App extends Component {
  constructor(){
    super();
    this.state = {
      switcheo: 'Hello Switcheo!',
      API: process.env.REACT_APP_SWITCHEOLYTICS_API
    }
  }

  render() {
    return (
      <Fragment>
        <SwitcheoHeader/>
        <SwitcheoGridBurnStatistics api={this.state.API}/>
        <SwitcheoReChart api={this.state.API}/>
        <SwitcheoGridChainStatistics api={this.state.API}/>
        <ContractBalance api={this.state.API}/>
      </Fragment>
    );
  }
}

export default App;
