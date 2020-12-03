import React, { Component  } from 'react';

export default class CoolButton extends Component {
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
    return (<button>A very cool button!</button>);
  }
}
