import React from "react";
import { withApollo } from "react-apollo";
import protectedRoute from "../components/protectedRoute";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const styles = theme => ({
  container: {
    background: "#232431",
    height: "100vh"
  }
});

class AdminDashboard extends React.Component {
  render() {
    const { classes } = this.props;
    return <div className={classes.container}>data fetched</div>;
  }
}

AdminDashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default protectedRoute(withApollo(withStyles(styles)(AdminDashboard)));
