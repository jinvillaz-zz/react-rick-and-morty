import React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuList,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { useTheme } from '@material-ui/core/styles';
import { Home, Menu } from '@material-ui/icons';
import { Switch, Route, NavLink, BrowserRouter as Router } from 'react-router-dom';

import { useStyles } from './constants';
import { HomeView } from '../../views/home';
import { CharacterView } from '../../views/character'

export const Routes = [
  {
    text: 'Home',
    path: '/',
    icon: Home,
    component: HomeView,
  }
];

export const Navbar = (props) => {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const activeRoute = () => {
    return Routes.findIndex(route => route.path === window.location.pathname);
  };
  const [index, setIndex] = React.useState(activeRoute());

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider/>
      <MenuList>
        {Routes.map((prop, key) => {
          return (
            <NavLink to={prop.path} style={{ textDecoration: 'none' }} key={key}>
              <MenuItem
                selected={key === index}
                onClick={() => setIndex(key)}>
                <ListItemText primary={prop.text}/>
                <ListItemIcon>{<prop.icon/>}</ListItemIcon>
              </MenuItem>
            </NavLink>
          );
        })}
      </MenuList>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap>
            Rick and Morty app
          </Typography>
        </Toolbar>
      </AppBar>
      <Router>
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
              ModalProps={{
                keepMounted: true // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>

        <main id="main" className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route path="/character/:id" children={<CharacterView/>} />
            <Route exact path="/" component={HomeView} />
          </Switch>
        </main>
      </Router>
    </div>
  );
};

Navbar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.instanceOf(
    typeof Element === "undefined" ? Object : Element
  )
};
