import React, { Component } from 'react';
import ReactDOM from'react-dom'
import  Container  from './container';
import  Draggable  from './draggable';
import { applyDrag, generateItems } from './utils';
import Loop from './loop'
import Loop2 from './loop2'
import './App.css' 
import Step from './step'

// window.React = React

const groupStyle = {
  marginLeft: '50px',
  // flex: 1,
  backgroundColor:'white',
  minHeight: '160px',
  minWidth: '160px',
  height: 'max-content',
  borderRadius:'8px'
}

const containerStyle = {
  width: '160px',
  minHeight: '160px',
  padding: '12px'
  // backgroundColor:'darkgoldenrod'
}

const libraryStyle = {
  padding: '6px',
  // flex: 1,
  backgroundColor:'darkgoldenrod',
  height: 'max-content'
}


var libraryItems = [
    {
    name: 'Homeward',
    stepinstruments:[], 
    instruments:[
    {label:'Acoustic Guitar', filename:'loops/homeacoustic.mp3', muted:false}, 
    {label:'Electric Piano', filename:'loops/homeepno.mp3', muted:false},
    {label:'Shaker', filename:'loops/homeshaker.mp3', muted:false}]}, 
    {
  name: 'Love Is Not Debt',
  stepinstruments:[],  
  instruments:[
  {label:'Arpeggiator', filename:'loops/debtarp.mp3', muted:false},
  {label:'Drums', filename:'loops/debtdrums.mp3', muted:false}, 
  {label:'Guitar/Bass', filename:'loops/debtgtr.mp3', muted:false}, 
  {label:'Organ', filename:'loops/debtorg.mp3', muted:false}, 
  {label:'Piano', filename:'loops/debtpno.mp3', muted:false}]}, 
  {
    name: 'Moondog\'s Lament',
    stepinstruments:[],  
    instruments:[
    {label:'Baritone Guitar', filename:'loops/moondogbari.mp3', muted:false},
    {label:'Trombone', filename:'loops/moondogbone.mp3', muted:false}, 
    {label:'Trumpet', filename:'loops/moondogtpt.mp3', muted:false}]}, 
  {
    name: 'Hungar',
    stepinstruments:[],  
    instruments:[ 
    {label:'Piano', filename:'loops/hungarpno.mp3', muted:false}, 
    {label:'Mellotron', filename:'loops/hungarmello.mp3', muted:false}]},
]


class Copy extends Component {
  constructor() {
    super();

    this.state = {
      library: generateItems(libraryItems.length, (i) => ({ id: '1' + i, data: `Source Draggable - ${i}` })),
      sequence: generateItems(0, (i) => ({ id: '2' + i, data: `Draggable 2 - ${i}` })),
      trash: generateItems(0, (i) => ({ id: '3' + i, data: `Draggable 3 - ${i}` })),
      rerender: true,
      count: 0,
      currentStep: 0
    }   
    this.checkMutes = this.checkMutes.bind(this) 
    this.formatInstruments = this.formatInstruments.bind(this) 
    this.checkMutes = this.checkMutes.bind(this) 
    this.playSequence = this.playSequence.bind(this) 
    this.stopSequence = this.stopSequence.bind(this)  
    this.nextStep = this.nextStep.bind(this) 
    this.componentWillUpdate = this.componentWillUpdate.bind(this) 
    this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this)  
  }

  componentDidMount() {
    const columns = [this.state.library, this.state.sequence, this.state.trash]
    for (var column in columns) {
      var myColumn = columns[column]
      for (var i in myColumn) {
      myColumn[i].name = libraryItems[i].name
      myColumn[i].instruments = libraryItems[i].instruments
      myColumn[i].stepinstruments = libraryItems[i].stepinstruments
      }
    }


  }

  shouldComponentUpdate() {
    if (this.state.rerender === true) {
      return true
      this.setState({rerender:false})
    } else {
      return false
      this.setState({rerender:true})
    }
  }


  componentWillUpdate () {
    this.checkMutes()    
  }


  formatInstruments(myLoop) {
    var myXML = []
      for (var s in myLoop.instruments) {
        const myLabel = myLoop.instruments[s].label

          if (myLoop.stepinstruments.includes(myLabel)) {
            const myFilename = myLoop.instruments[s].filename
           
            if (s === 0) {  // use first instrument as guide track
              myXML.push(
              <div key={s}>{myLabel}
                <audio src={myFilename} onEnded={this.nextStep}/>
              </div>
              )
            } else {
              myXML.push(
              <div key={s}>{myLabel}
                <audio src={myFilename}/>
              </div>
              )
            }



         
          }
        }
        return myXML
    }

  checkMutes () {
      var myReturn=[]
      var myLoops = (ReactDOM.findDOMNode(this).getElementsByClassName('loop'))
      for (var z=0; z < myLoops.length; z++) {
        var myLoophead =  myLoops[z].getElementsByClassName('loopname')[0].innerHTML
        if (libraryItems[z].name === myLoophead) {
          var mutedInstruments = myLoops[z].getElementsByClassName("muted")
          var unmutedInstruments = myLoops[z].getElementsByClassName("unmuted")

          var myInstanceLabel
          var myLibraryLabel
          var c
          var d 
          libraryItems[z].stepinstruments = []
          for (c=0; c < mutedInstruments.length; c++) { // iterate dragged item
            myInstanceLabel = mutedInstruments[c].innerHTML
            for (d=0; d < libraryItems[z].instruments.length; d++) { 
              myLibraryLabel = libraryItems[z].instruments[d].label
               if (myInstanceLabel === myLibraryLabel) {
                libraryItems[z].instruments[d].muted = true
              }  // end if
            }  // end for
          }  // end for

          for (c=0; c < unmutedInstruments.length; c++) { // iterate dragged item
            myInstanceLabel = unmutedInstruments[c].innerHTML
            for (d=0; d < libraryItems[z].instruments.length; d++) { 
              myLibraryLabel = libraryItems[z].instruments[d].label
              if (myInstanceLabel === myLibraryLabel) {
         

                libraryItems[z].instruments[d].muted = false
                libraryItems[z].stepinstruments.push(myInstanceLabel)  
            // if (myLoophead === 'Homeward') console.log(`
            
            // libraryItems[z].stepinstruments
            // ${libraryItems[z].stepinstruments}
           

            // `)
              }  // end if
         
            }  // end for   
           
          }  // end for
          }
    }
  }


  nextStep () {
    console.log (`
      next step
      ${this.state.sequence[this.state.currentStep]}
    `)
    // this.stopSequence()
    if (this.state.currentStep < this.state.sequence.length-1) {
      this.setState({currentStep: this.state.currentStep+1})
    } else {
      this.setState({currentStep: 0})
    }
    this.playSequence()
  }

  playSequence () {
    console.log ('play sequence')
    var myStepDiv = ReactDOM.findDOMNode(this).getElementsByClassName("step")[this.state.currentStep]
   var myAudios = myStepDiv.getElementsByTagName("audio")

    myAudios[0].onended = this.nextStep
    for  (var a=0; a < myAudios.length; a++) {
      myAudios[a].play()
    }
  
  }

stopSequence () {
  this.setState({currentStep:0})
    var myStepDiv = ReactDOM.findDOMNode(this).getElementsByClassName("step")[this.state.currentStep]
   var myAudios = myStepDiv.getElementsByTagName("audio")
    for  (var a=0; a < myAudios.length; a++) {
      myAudios[a].pause()
      myAudios[a].currentTime = 0
      console.log (`
      Audio
      ${myAudios[a]}
      +++++++++++++
    `)
    }
}

  render() {
    console.log('render ')

    return (
      <div>
{/* //////////////  LIBRARY   ///////////////////////////// */}
      <div style={{ display: 'flex', justifyContent: 'stretch', marginTop: '50px', marginRight: '50px' }}>
        <div style={groupStyle}>
         <div className='libraryhead'>Library</div>
          <Container  style={containerStyle} groupName="1" behaviour="copy" getChildPayload={i => this.state.library[i]} onDrop={e => this.setState({ library: applyDrag(this.state.library, e)})}>
            {
              this.state.library.map((p,i) => {
                var myKey="0" + i
                return (
                  <Draggable key={myKey}>
                    <div className="draggable-item">
                    <Loop name={libraryItems[i].name} instruments={libraryItems[i].instruments}  />   
                    {/* <Loop2 name={libraryItems[i].name} instruments={libraryItems[i].instruments}  /> */}
                    </div>
                  </Draggable>
                );
              })
            }
          </Container>
        </div>
        
{/* //////////////////////  SEQUENCE   ///////////////////////////// */}
      <div style={groupStyle}>
         <div className="libraryhead">Sequence</div>
            
              <div style={{marginLeft:"8px", marginRight:'0px'}}>
                <button id='playsequence' onClick={this.playSequence}>PLAY</button>
                <button id='pausesequence' onClick={this.stopSequence}>STOP</button>
              </div>
           
         <Container style={containerStyle} className='seqdiv'groupName="1" getChildPayload={i => this.state.sequence[i]} onDrop={e => this.setState({ sequence: applyDrag(this.state.sequence, e) })}>
            { 
            

            // start map sequence 
              this.state.sequence.map((e, i) => { 
                // console.log('e.stepinstruments ' ,   e.stepinstruments)
                 if (e.stepinstruments.length < 1) {
                  for (var f in libraryItems) {
                    var myName = libraryItems[f].name
                      if  (e.name === myName) {
                        // console.log('libraryItems[f].stepinstruments  '  , libraryItems[f].stepinstruments) 
                        e.stepinstruments = libraryItems[f].stepinstruments
                      }
                  }
                 } else {
                  //  console.log(" e.stepinstruments.length >= 1    ")
                 }
                const myInstruments = this.formatInstruments(e)
                
                    return (
                      <Draggable key={i}>
                        <div className="draggable-item"> 
                         {/* <Step name={e.name} instruments={myInstruments} />  */}
                         <div className='step'>
                          <h3>{e.name}</h3>
                          <div>{myInstruments}</div>                                      
                          </div> 
                        </div>
                      </Draggable>
                    ) //return 
               }) // map sequence
            }
          </Container>
        </div>        
          
{/* //////////////////////  TRASH   ///////////////////////////// */}
      <div style={groupStyle}>
         <div className='libraryhead'>Trash <p></p></div>
          <Container className='trashdiv' groupName="1" getChildPayload={i => this.state.trash[i]} onDrop={e => this.setState({ trash: applyDrag(this.state.trash, e) })}>
            {
              this.state.trash.map(p => {
                return (
                  <div>
                  <Draggable key={p.id}>
                    {/* <div className="draggable-item">
                    </div> */}
                  </Draggable>
                  <span>
                  <img className='openbtn' src='trash.png' alt='trash'/>
                  </span>
                  </div>
                );
              })
            }
          </Container>
        </div>        
      </div>
      </div>
    );
  }
}

Copy.propTypes = {

};

export default Copy;