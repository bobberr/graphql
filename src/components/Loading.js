import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import { Spin, Icon } from "antd";

const styles = {
  progressContainer: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
};

const Loading = ({ classes, size }) => {
  const loadingIcon = (
    <Icon type="loading" style={{ fontSize: size || 36 }} spin />
  );

  return (
    <div className={classes.progressContainer}>
      <Spin indicator={loadingIcon} />
    </div>
  );
};

Loading.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectSheet(styles)(Loading);
