import React, { Component } from 'react';
import { Step } from './step';

class Sequencer extends Component {

    allowDrop() {
        console.log ("allow drop")
    }

    onDrop() {
        console.log ("drop")
    }
    
   
    render () {


        
        return (
            <div className='seqdiv' onDragOver={this.allowDrop} onDrop={this.onDrop} >
        <h1 className='seqhead'> this is the sequencer </h1>
        < Step />
        </div>
        )
    }
}

export default Sequencer