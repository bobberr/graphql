import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const styles = theme => ({
  progressContainer: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
});

const Loading = ({ classes }) => {
  return (
    <div className={classes.progressContainer}>
      <CircularProgress />
    </div>
  );
};

Loading.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Loading);
