import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import { Form } from 'formsy-react';
import Input from 'components/Input';
import styles from './styles.styl';

@cssModules(styles)
export class SignUp extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      signUp: PropTypes.func.isRequired,
    }),
  };

  state = {
    errorMessage: undefined,
  };

  handleValidSubmit = user => this.props.actions.signUp(user);

  handleInvalidSubmit = () => {
    // Show error message
  }

  renderErrorMessage() {
    if (this.state.errorMessage) {
      return <div>{this.state.errorMessage}</div>;
    }
    return null;
  }

  render() {
    return (
      <div styleName="auth-container">
        <Form
          onValidSubmit={this.handleValidSubmit}
          onInvalidSubmit={this.handleInvalidSubmit}
        >
          <header styleName="header">Sign Up</header>
          {this.renderErrorMessage()}
          <Input
            name="email"
            validations="isEmail"
            validationError="This is not a valid email"
            required
            placeholder="Email"
          />
          <Input
            name="name"
            placeholder="Name (optional)"
          />
          <Input
            name="password"
            type="password"
            required
            placeholder="Password"
          />
          <button
            type="submit"
            styleName="button"
          >
            Submit
          </button>
        </Form>
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { createStructuredActions } from 'helpers/actions';
import { signUp } from 'modules/user/actions';

export default connect(
  undefined,
  createStructuredActions({ signUp })
)(SignUp);
