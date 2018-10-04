import React, { Component } from 'react';
import Loop from './loop';
import Copy from './copy';


class LoopLibrary extends Component {



    constructor(props) {
        super(props)

        this.state = {
            loops:[{name:'loop4', id:1}, {name: 'loop5', id:2}, {name:'loop6', id:3}],
            currentLoop: null,
            msg: this.props.msg || "Loop Library"
}
        this.playPause = this.playPause.bind(this)
        this.stopLoop = this.stopLoop.bind(this) 
    }

    playPause() {
      console.log ("play/pause loop")
      }
      
      stopLoop() {
          console.log ("stop loop")
      }

      

    render () {
        var myLoops = this.state.loops.map((e) => {
             return (< Loop name={e.name} key={e.id}/>)
     } )
        return (
            <div>
        <h1 className='libraryhead'> {this.state.msg} </h1>
                <button onClick={this.playPause} >Play</button>
                <button onClick={this.stopLoop} >Stop</button>
                <div>{myLoops}</div>
                < Copy />
        </div>
        )
    }
}

export default LoopLibrary 