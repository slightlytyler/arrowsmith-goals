import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import cssModules from 'react-css-modules';
import listensToClickOutside from 'react-onclickoutside/decorator';
import styles from '../styles.styl';

@listensToClickOutside()
@cssModules(styles)
export default class GoalsCreatorInput extends Component {
  static propTypes = {
    placeholder: PropTypes.string.isRequired,
    actions: PropTypes.shape({
      submit: PropTypes.func.isRequired,
    }),
  };

  handleClickOutside = () => {
    this.submit();
  }

  submit = () => {
    this.props.actions.submit(findDOMNode(this.refs.input).value);
  }

  handleKeyDown = e => e.which === 13 && this.submit();

  render() {
    return (
      <div styleName="content">
        <input
          ref="input"
          styleName="input"
          placeholder={this.props.placeholder}
          onKeyDown={this.handleKeyDown}
          autoFocus
        />
        <section
          styleName="add--button"
          onClick={this.submit}
        >
          Add
        </section>
      </div>
    );
  }
}
