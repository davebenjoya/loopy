import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { exampleAction } from '../actions/actions.js'

class App extends React.Component {
  constructor(props) {
    super (props) 
    this.state = {


    }
  }

  render() {
    return (
      <div>
        <h1>Hello world, this  is a Redux tutorial </h1>
        <p>Here is our property: {this.props.examplePropOne}</p>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
return {
  examplePropOne: state.examplePropOne,
  examplePropTwo: state.examplePropTwo,
}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators( { exampleAction }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps) (App)