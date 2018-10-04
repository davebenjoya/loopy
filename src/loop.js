import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import Instrument from './instrument'
import './App.css'
import AnimateHeight from 'react-animate-height';

class Loop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:props.name,
            instruments:props.instruments,
            stepinstruments:[],
            showinstruments: false,
            playing: false,
            height: 0
        }
        this.playloop = this.playloop.bind(this)
        this.stoploop = this.stoploop.bind(this)
        this.toggleInstruments = this.toggleInstruments.bind(this)
    }



    toggleInstruments(e) {
        var myDivHide = (ReactDOM.findDOMNode(this).getElementsByClassName('hide')[0])
        var myDivShow = (ReactDOM.findDOMNode(this).getElementsByClassName('show')[0])
        if (myDivHide) {  // show this div 
            this.setState({showinstruments: true})
            this.setState({playing: false})
            ReactDOM.findDOMNode(this).getElementsByClassName('openbtn')[0].className='closebtn'
            myDivHide.className = 'show'

            var myLoops = (ReactDOM.findDOMNode(this).parentElement.parentElement.parentElement.getElementsByClassName('loop'))
            for (var l=0; l < myLoops.length; l++) {
                const myLoop  = myLoops[l].getElementsByClassName('show')[0]
                if (myLoop && myLoop !== myDivHide) {  // another loop is opened
                    myLoop.className = 'hide'
                    myLoop.parentElement.getElementsByClassName('closebtn')[0].className='openbtn'
                    const myButton = myLoop.parentElement.getElementsByTagName('button')[0]
                    if (myButton.innerHTML === "pause") {
                        myButton.innerHTML = "play"
                        const myAudio = myLoop.getElementsByTagName('audio')
                        for (var a=0; a < myAudio.length; a++) {
                            myAudio[a].pause()
                            myAudio[a].currentTime=0
                        }
                    } 
                }

            }
        } else {
            this.setState({showinstruments: false})
            this.stoploop()  
            ReactDOM.findDOMNode(this).getElementsByClassName('closebtn')[0].className='openbtn'
            myDivShow.className = 'hide'
        } 
    }


    playloop() {
        var myAudio = ReactDOM.findDOMNode(this).querySelectorAll('audio')
        var myBtn = ReactDOM.findDOMNode(this).getElementsByClassName('playbtn')[0]
        for (let i of myAudio) {
            if (this.state.playing === false) {
                i.play()
                this.setState ({playing : true})
                myBtn.innerHTML = 'pause'
            } else {
                i.pause()
                this.setState ({playing : false})
                myBtn.innerHTML = 'play'
            }
            this.setState ({playing : !this.state.playing})
        }
    }

    stoploop() {
        this.setState ({playing : false})
        ReactDOM.findDOMNode(this).getElementsByClassName('playbtn')[0].innerHTML = 'play'
        var myAudio = ReactDOM.findDOMNode(this).querySelectorAll('audio')
        for (let i of myAudio) {
            i.pause()
            i.currentTime = 0
        }
    }

    render () {
        
  
    var instrumentDivs = []
        for (var k=0; k< this.state.instruments.length; k++) {
            // console.log('this.state.instruments[k]  ' , this.state.instruments[k].muted)
            var myRef = React.createRef()
            var myDiv = <Instrument key={k} myRef={myRef} label={this.state.instruments[k].label} filename={this.state.instruments[k].filename}  />
            instrumentDivs.push(myDiv)
        }
 const { height } = this.state.height;
 
        return (


      <div>
      
        {/* <AnimateHeight
          duration={ 500 }
          height= {this.state.height} // see props documentation bellow
        > */}
       
            <div className='loop'>
                <div className='loophead'onClick={this.toggleInstruments}>
                    <div className='loopname'>{this.state.name}</div>
                    <span className='openspan'>
                    &nbsp; &nbsp; <img className='openbtn' src='open.png' alt='open'/>
                    </span>
                </div>
                <div ref = 'hideable' className = 'hide'>
                    <button className='playbtn'onClick={this.playloop}>play</button>
                    <button onClick={this.stoploop}>stop</button>
                    <div>{instrumentDivs}</div>
                </div>
            </div>
         {/* </AnimateHeight> */}
      </div>
      )
    }
}

export default Loop