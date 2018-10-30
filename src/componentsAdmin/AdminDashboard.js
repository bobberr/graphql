import React from "react";
import { withApollo } from "react-apollo";
import ProtectedRoute from "../components/ProtectedRoute";
import PropTypes from "prop-types";
import { Route, Link } from "react-router-dom";
import BrandsPage from "./BrandsPage";
import SeriesPage from "./SeriesPage";
import injectSheet from "react-jss";
import { Menu, Icon } from "antd";

const styles = {
  container: {
    background: "#232431",
    color: "white",
    height: "100vh",
    overflow: "hidden",
    position: "relative",
    display: "flex",
    flexDirection: "column"
  },
  appBar: {
    background: "#27293D",
    height: "100px",
    boxShadow: "0px 5px 5px 0px rgba(0,0,0,0.75)",
    zIndex: 10000
  },
  appTitle: {
    fontSize: "26px",
    height: "36px",
    lineHeight: "36px",
    margin: "30px",
    color: "white"
  },
  menu: {
    width: "250px"
  },
  mainArea: {
    display: "flex",
    alignItems: "flex-start"
  },
  menuLink: {
    fontSize: "18px"
  },
  menuItem: {
    display: "flex",
    alignItems: "center"
  }
};

const linksConfig = [
  {
    name: "Home",
    path: "/admin-dashboard",
    icon: "area-chart"
  },
  {
    name: "Brand page",
    path: "/admin-dashboard/brands",
    icon: "car"
  },
  {
    name: "Series page",
    path: "/admin-dashboard/series",
    icon: "copy"
  }
];

class AdminDashboard extends React.Component {
  render() {
    const { classes } = this.props;
    const links = linksConfig.map(link => (
      <Menu.Item className={classes.menuItem} key={link.path}>
        {link.icon ? (
          <Icon
            style={{ fontSize: "18px" }}
            className={classes.menuIcon}
            type={link.icon}
          />
        ) : null}
        <Link className={classes.menuLink} to={link.path}>
          {link.name}
        </Link>
      </Menu.Item>
    ));

    return (
      <div className={classes.container}>
        <div className={classes.appBar}>
          <h3 className={classes.appTitle}>Tuning cars project logo</h3>
        </div>
        <div className={classes.mainArea}>
          <Menu
            defaultSelectedKeys={[`${document.location.pathname}`]}
            mode="inline"
            theme="dark"
            className={classes.menu}
          >
            {links}
          </Menu>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Route path="/admin-dashboard/brands" component={BrandsPage} />
            <Route path="/admin-dashboard/series" component={SeriesPage} />
          </main>
        </div>
      </div>
    );
  }
}

AdminDashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default ProtectedRoute(withApollo(injectSheet(styles)(AdminDashboard)));
