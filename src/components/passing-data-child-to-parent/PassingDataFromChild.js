import React, { PureComponent } from "react";
import PropTypes, { resetWarningCache } from "prop-types";
import styles from "./PassingDataFromChild.css";
import SelectLanguage from "./SelectLanguage";

class PassingDataFromChild extends PureComponent {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = { lang: "" };
  }

  handleLanguage = (lang) => {
    this.setState({ lang: lang });
    console.log(lang);
  };

  render() {
    return (
      <div className={styles.base}>
        <SelectLanguage onSelectLanguage={this.handleLanguage} />
      </div>
    );
  }
}
export default PassingDataFromChild;

