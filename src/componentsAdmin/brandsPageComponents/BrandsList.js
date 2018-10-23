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
import { Subscription } from "react-apollo";
import gql from "graphql-tag";
import uuidv4 from "uuid/v4";
import Loading from "../../components/Loading";
import { withApollo } from "react-apollo";

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

const BRANDS_SUBSCRIPTION = gql`
  subscription onBrandAdded {
    brandAdded {
      _id
      name
    }
  }
`;

const query = gql`
  query getAllBrands {
    getAllBrands {
      _id
      name
    }
  }
`;

class BrandsList extends React.Component {
  state = {
    name: "",
    loading: true,
    brands: []
  };

  componentDidMount = async () => {
    const queryResult = await this.props.client.query({
      query,
      fetchPolicy: "network-only"
    });
    this.setState({
      loading: queryResult.loading,
      brands: queryResult.data.getAllBrands
    });
    this._subscribe();
  };

  componentWillUnmount = () => {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  };

  _subscribe = () => {
    this.subscription = this.props.client
      .subscribe({
        query: BRANDS_SUBSCRIPTION
      })
      .subscribe(payload => {
        this.setState(prevState => ({
          brands: [...prevState.brands, payload.data.brandAdded]
        }));
      });
  };

  render() {
    const { classes } = this.props;
    const { brands } = this.state;
    const brandListItems = brands.map(brand => {
      return (
        <ListItem key={uuidv4()} button>
          <ListItemText primary={brand.name} />
        </ListItem>
      );
    });
    return (
      <div className={classes.listContainer}>
        {this.state.loading ? (
          <Loading />
        ) : (
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
                  margin="normal"
                  variant="outlined"
                />
                {brandListItems}
              </div>
            )}
          </List>
        )}
      </div>
    );
  }
}

BrandsList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withApollo(BrandsList));
