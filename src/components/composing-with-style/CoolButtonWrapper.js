import React, { Component  } from 'react';

export default class CoolButtonWrapper extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  actionHandler = ()=> {}

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
  }

  componentWillUnmount() {
  }

  render() {
    const {props} = this;
    return (<div className={'cool_button_wrapper'} style={{color:"white", backgroundColor: "rebeccapurple"}}>{this.props.children}</div>)
  }
}
