import React, { Component } from 'react';

class Instrument extends Component {
    constructor(props)  {
        super(props)
        this.state = {
            label: props.label,
            filename: props.filename,
            muted: props.muted,
            ref: props.myRef
        }

        this.onHandleClick = this.onHandleClick.bind(this)
    }

    onHandleClick(e) {
        if (this.state.muted) {
            this.setState({muted: false})
        } else {
            this.setState({muted: true})
        }
        var myAudio = e.target.parentElement.querySelector('audio')
        myAudio.volume = myAudio.volume === 0 ? myAudio.volume = 1: myAudio.volume = 0
        e.target.className = e.target.className === 'muted' ? 'unmuted' : 'muted'

    }
        
    loopInstruments(e) {
        e.target.currentTime = 0
        e.target.play()
    }

    



    render () {
        var myMuted = this.state.muted === true ? 'muted' : 'unmuted'

        return (
            <div>
            <div ref={this.state.ref} className={myMuted} onClick={this.onHandleClick}>
               {this.state.label}
               {/* {this.state.ref.current} */}
</div>
                <audio src={this.state.filename} onEnded={this.loopInstruments}></audio>
            </div>
        )
    }
}

export default Instrument