import React, { Component  } from 'react';

export default class Child extends Component {
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
    return (<div className={'cool_button'}>
      <button>{this.props.inheritance}</button>

    </div>);
  }
}
