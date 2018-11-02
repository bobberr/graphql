import React from "react";
import PropTypes from "prop-types";
import BrandsList from "./brandsPageComponents/BrandsList";
import AddBrandForm from "./brandsPageComponents/AddBrandForm";
import injectSheet from "react-jss";

const styles = {
  container: {
    height: "100%"
  },
  mainArea: {
    display: "flex"
  }
};

class BrandsPage extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <div className={classes.mainArea}>
          <BrandsList />
          <AddBrandForm />
        </div>
      </div>
    );
  }
}

BrandsPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectSheet(styles)(BrandsPage);
