import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';

import styles from './styles.styl';

@cssModules(styles)
export default class SubscriptionsOptions extends Component {
  static propTypes = {
    checkout: PropTypes.func.isRequired,
  };

  renderButton(plan, highlight) {
    const handleClick = () => this.props.checkout(plan);

    return (
      <button
        styleName={highlight ? 'button--highlight' : 'button'}
        onClick={handleClick}
      >
        Get started
      </button>
    );
  }

  render() {
    return (
      <div styleName="options">
        <section styleName="option">
          <header styleName="header">Standard</header>
          <div styleName="content">
            <section styleName="price">$5/mo</section>
            <section styleName="tag-line">
              All-in-one customer support for small business
            </section>
            {this.renderButton('standard')}
          </div>
        </section>
        <section styleName="option">
          <header styleName="header--highlight">Pro</header>
          <div styleName="content">
            <section styleName="price">$10/mo</section>
            <section styleName="tag-line">
              Everything you need to take support to the next level
            </section>
            {this.renderButton('pro', true)}
          </div>
        </section>
        <section styleName="option">
          <header styleName="header">Enterprise</header>
          <div styleName="content">
            <section styleName="price">$20/mo</section>
            <section styleName="tag-line">
              Complete support with enterprise-grade customization
            </section>
            {this.renderButton('enterprise')}
          </div>
        </section>
      </div>
    );
  }
}
