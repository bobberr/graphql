import React from "react";
import { withApollo } from "react-apollo";
import protectedRoute from "../components/protectedRoute";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Route, Link } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import BrandsPage from "./BrandsPage";
import SeriesPage from "./SeriesPage";

const styles = theme => ({
  container: {
    background: "#232431",
    color: "white",
    height: "100vh",
    flexGrow: 1,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex"
  },
  appBar: {
    background: "#27293D",
    position: "absolute",
    zIndex: "10000"
  },
  drawerPaper: {
    width: "200px",
    position: "relative",
    background: "#1F8EF1"
  },
  toolbar: theme.mixins.toolbar,
  link: {
    color: "white",
    display: "block",
    textDecoration: "none",
    padding: "11px 24px",
    width: "100%"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    minWidth: 0,
    backgroundColor: "#232431"
  },
  listItem: {
    padding: 0
  }
});

const linksConfig = [
  {
    name: "Home",
    path: "/admin-dashboard"
  },
  {
    name: "Brand page",
    path: "/admin-dashboard/brands"
  },
  {
    name: "Series page",
    path: "/admin-dashboard/series"
  }
];

class AdminDashboard extends React.Component {
  render() {
    const { classes } = this.props;
    const links = linksConfig.map((link, i) => (
      <ListItem
        key={i}
        divider
        classes={{ root: classes.listItem }}
        button={true}
      >
        <Link className={classes.link} to={link.path}>
          {link.name}
        </Link>
      </ListItem>
    ));
    return (
      <div className={classes.container}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Tuning cars project logo
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.toolbar} />
          <List>{links}</List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Route path="/admin-dashboard/brands" component={BrandsPage} />
          <Route path="/admin-dashboard/series" component={SeriesPage} />
        </main>
      </div>
    );
  }
}

AdminDashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default protectedRoute(withApollo(withStyles(styles)(AdminDashboard)));
