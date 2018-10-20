import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import PropTypes from "prop-types";

const styles = theme => ({
  listContainer: {
    background: "#27293D",
    width: "220px",
    padding: "0 30px",
    marginRight: "50px"
  },
  listItemText: {
    color: "#9a9a9a"
  },
  formControl: {
    width: "100%"
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
          <FormControl
            classes={{
              root: classes.formControl
            }}
            disabled
          >
            <InputLabel style={{ color: "white" }} disabled>
              There are no brands
            </InputLabel>
            <Input onChange={this._changeLogIn} type="text" />
          </FormControl>
        ) : (
          <div>
            <TextField
              label="Brand name"
              value={this.state.name}
              onChange={this.handleChange("name")}
              margin="normal"
              variant="outlined"
            />
            {brandListItems}
          </div>
        )}
      </List>
    </div>
  );
};

BrandsList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BrandsList);