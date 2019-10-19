import React from 'react';
import PropTypes from 'prop-types';

import Meta from './Meta';
import { Grid } from './layout/grid';
import MainAppBar from '../components/layout/MainAppBar';

export default class Page extends React.Component {
  constructor(props) {
    super(props);
    this.onMenuToggle = this.onMenuToggle.bind(this);
    this.state = { menuOpen: false };
  }

  onMenuToggle = force => {
    // Optional force param should be bool
    let newMenuOpen = !this.state.menuOpen;
    if (force != undefined) {
      newMenuOpen = force;
    }
    this.setState({ menuOpen: newMenuOpen });
  };

  render() {
    var { children, activePage, title, meta, isFluid } = this.props;

    if (!activePage) {
      activePage = 'blog';
    }

    // Account for meta not populated - default to page title if we have one
    if (!meta && title) {
      meta = { title: title };
    }

    return (
      <div>
        <Meta meta={meta} />
        <MainAppBar activePage={activePage} onMenuToggle={this.onMenuToggle} />

        <Grid fluid={isFluid}>{children}</Grid>
      </div>
    );
  }
}

Page.propTypes = {
  activePage: PropTypes.string,
  title: PropTypes.string,
  meta: PropTypes.object,
  isFluid: PropTypes.bool,
  children: PropTypes.node
};
