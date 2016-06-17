import React, { Component, PropTypes } from 'react';
import { HOC as formInput } from 'formsy-react';
import cssModules from 'react-css-modules';
import styles from './styles.styl';

@cssModules(styles)
class Input extends Component {
  static propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    getValue: PropTypes.func.isRequired,
    setValue: PropTypes.func.isRequired,
  };

  handleChange = e => this.props.setValue(e.target.value);

  render() {
    return (
      <input
        styleName="input"
        type={this.props.type}
        placeholder={this.props.placeholder}
        value={this.props.getValue()}
        onChange={this.handleChange}
      />
    );
  }
}

export default formInput(Input);
