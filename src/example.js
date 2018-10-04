import React, { Component } from 'react';
import AnimateHeight from 'react-animate-height';
 
export default class Example extends Component {
    constructor (props)  {
        super (props)
  this.state = {
    height: 0,
  };
    }
 
  toggle = () => {
    const { height } = this.state;
 
    this.setState({
      height: height === 0 ? 'auto' : 0,
    });
  };
 
  render() {
    const { height } = this.state;
 
    return (
      <div>
        <button onClick={ this.toggle }>
          { height === 0 ? 'Open' : 'Close' }
        </button>
 
        <AnimateHeight
          duration={ 500 }
          height={ height } // see props documentation bellow
        >
          <h1>Your content goes here</h1>
          <p>Put as many React or HTML components here.</p>
        </AnimateHeight>
      </div>
    );
  }
}
