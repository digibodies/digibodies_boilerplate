import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'clsx';
import Link from 'next/link';

import { withStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import { Grid, Row } from '../../components/layout/grid';

const styles = theme => ({
  root: { flexGrow: 1 },
  flex: { flex: 1 },

  titleImage: {
    [theme.breakpoints.down('sm')]: {
      maxWidth: '200px',
      marginLeft: '-24px'
    }
  }
});

const MenuOption = ({ classes, active, href, as, ...props }) => {
  return (
    <Link href={href} as={as}>
      <Button
        component="a"
        className={classnames(classes.menuLink, active && 'active')}
        href={as}
        {...props}
        color="inherit"
      />
    </Link>
  );
};
MenuOption.propTypes = {
  classes: PropTypes.object,
  active: PropTypes.bool,
  href: PropTypes.string,
  as: PropTypes.string,
  children: PropTypes.node
};

function ButtonAppBar(props) {
  const { classes, activePage, onMenuToggle } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Grid>
          <Toolbar className={classes.toolbar}>
            <div className={classes.flex}>
              <Link href="/index" as="/">
                <a title="Home">
                  <img
                    src="https://storage.googleapis.com/blaine-garrett/theme/v2/logo.png"
                    alt="Blaine Garrett Logo"
                    className={classes.titleImage}
                  />
                </a>
              </Link>
            </div>

            <Hidden mdUp>
              <IconButton
                className={classes.menuButton}
                color="inherit"
                aria-label="Menu"
                onClick={() => onMenuToggle()}
              >
                <Icon>menu</Icon>
              </IconButton>
            </Hidden>

            <Hidden smDown>
              <MenuOption
                classes={classes}
                href="/about"
                as="/about"
                active={activePage == 'about'}
              >
                About
              </MenuOption>
              <MenuOption
                classes={classes}
                href="/blog"
                as="/blog"
                active={activePage == 'blog'}
              >
                Blog
              </MenuOption>
              <MenuOption
                classes={classes}
                href="/blog/category?slug=art"
                as="/art"
                active={activePage == 'art'}
              >
                Art
              </MenuOption>
              <MenuOption
                classes={classes}
                href="/blog/category?slug=programming"
                as="/programming"
                active={activePage == 'programming'}
              >
                Programming
              </MenuOption>
              <MenuOption
                classes={classes}
                href="/links"
                as="/links"
                active={activePage == 'links'}
              >
                Links
              </MenuOption>
            </Hidden>
          </Toolbar>
        </Grid>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  activePage: PropTypes.string,
  onMenuToggle: PropTypes.func
};

export default withStyles(styles)(ButtonAppBar);
