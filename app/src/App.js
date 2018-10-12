import React, { Component, Fragment } from 'react'
import { ContractBalance, SwitcheoHeader, SwitcheoGridBurnStatistics, SwitcheoGridChainStatistics, SwitcheoReChart } from './Components'

class App extends Component {
  constructor(){
    super();
    this.state = {
      switcheo: 'Hello Switcheo!'
    }
  }

  render() {
    return (
      <Fragment>
        <SwitcheoHeader/>
        <SwitcheoGridBurnStatistics/>
        <SwitcheoReChart/>
        <SwitcheoGridChainStatistics/>
        <ContractBalance/>
      </Fragment>
    );
  }
}

export default App;
