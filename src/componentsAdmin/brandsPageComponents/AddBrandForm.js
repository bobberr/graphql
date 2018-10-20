import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";

const classes = theme => ({
  addBrandContainer: {
    background: "#27293D",
    padding: "20px"
  },
  addBrandTitle: {
    color: "white",
    marginBottom: "10px"
  },
  addBrandInput: {
    color: "white"
  },
  inputAfter: {
    "&:after": {
      borderBottomColor: "#2590EC"
    }
  },
  inputLabel: {
    color: "#9a9a9a",
    "&$inputLabelFocused": {
      color: "#9a9a9a"
    }
  },
  inputLabelFocused: {},
  inputRoot: {
    color: "#9a9a9a"
  }
});

class AddBrandForm extends React.Component {
  state = {
    brandName: ""
  };

  _submitAddBrand = e => {
    e.preventDefault();
    console.log(this.state.brandName);
  };

  _changeBrandName = e => {
    this.setState({
      brandName: e.target.value
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.addBrandContainer}>
        <Typography
          component="h3"
          variant="h5"
          classes={{
            h5: classes.addBrandTitle
          }}
        >
          Add brand
        </Typography>
        <form onSubmit={this._submitAddBrand}>
          <FormControl
            classes={{
              root: classes.formControl
            }}
            required={true}
          >
            <InputLabel
              FormLabelClasses={{
                root: classes.inputLabel,
                focused: classes.inputLabelFocused
              }}
            >
              Brand name
            </InputLabel>
            <Input
              onChange={this._changeBrandName}
              type="text"
              value={this.state.brandName}
              classes={{
                root: classes.inputRoot,
                underline: classes.inputAfter
              }}
            />
          </FormControl>
        </form>
      </div>
    );
  }
}

AddBrandForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(classes)(AddBrandForm);
