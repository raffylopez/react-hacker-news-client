import React from 'react';
import CoolButtonWrapper from "./CoolButtonWrapper";
import CoolButton from "./CoolButton";

export default class ComposingWithStyle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return(
      <div style={{fontFamily: "Arial"}}>
        <CoolButtonWrapper secretMessage="very cool">
          <CoolButton/>
          <CoolButton/>
        </CoolButtonWrapper>
      </div>
    )
  }
}
