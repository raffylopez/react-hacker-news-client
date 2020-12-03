import React, { Component  } from 'react';

export default class Parent extends Component {
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
    // const clonedChildren = this.props.children.map(child=>{return Object.assign({foo:"bar"}, child)});
    // const clonedChildren = React.cloneElement(this.props.children, {foo:"bar"});
    const inheritance = this.props.inheritance ? this.props.inheritance : "Click Me.";
    const clonedChildren = React.Children.map(this.props.children, child=>{
      if (React.isValidElement(child)) {

        if (child.props.breed==='superior') {
          return React.cloneElement(child, {inheritance:"A GRAND Physique!"})
        }
        return React.cloneElement(child, {inheritance})
      }
      return child;
    });
    return (<div className={'parent'}>
      {clonedChildren}
    </div>);

  }
}
