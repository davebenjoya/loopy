import React, { Component } from 'react';
import './App.css'

class Step extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:props.name,
            instruments:props.instruments
        }
    }

   
  formatInstruments(myInstruments) {
    var myXML = []
      for (var inst in myInstruments) {
        myXML.push(<div className='instrument' key={inst}>{myInstruments[inst]}</div>)
      }
      return myXML
  }
  
    render () {
        const myInstruments = this.formatInstruments(this.state.instruments)       
        return (
            <div>
            <h3> {this.state.name}</h3>
            {myInstruments}
        </div>
        )
    }
}

export default Step