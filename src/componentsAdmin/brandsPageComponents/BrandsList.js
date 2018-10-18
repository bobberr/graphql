import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const styles = theme => ({
  listContainer: {
    background: "#27293D",
    width: "300px"
  },
  listItemText: {
    color: "white"
  }
});

const BrandsList = ({ brands, classes }) => {
  const brandListItems = brands.map(brand => {
    return (
      <ListItem button>
        <ListItemText primary={brand.name} />
      </ListItem>
    );
  });
  return (
    <div className={classes.listContainer}>
      <List component="ul">
        {brandListItems.length === 0 ? (
          <ListItem button>
            <ListItemText
              classes={{ textDense: classes.listItemText }}
              primary="There is no brand"
            />
          </ListItem>
        ) : (
          brandListItems
        )}
      </List>
    </div>
  );
};

BrandsList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BrandsList);
