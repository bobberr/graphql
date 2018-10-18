import React from "react";
import gql from "graphql-tag";
import { withApollo } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Loading from "../components/Loading";
import BrandsList from "./brandsPageComponents/BrandsList";

const styles = theme => ({
  container: {
    height: "100%"
  }
});

const query = gql`
  query getAllBrands {
    getAllBrands {
      name
    }
  }
`;

class BrandsPage extends React.Component {
  state = {
    loading: true,
    brands: []
  };

  async componentDidMount() {
    const queryResult = await this.props.client.query({
      query,
      fetchPolicy: "network-only"
    });
    this.setState({
      loading: queryResult.loading,
      brands: queryResult.data.getAllBrands
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        {this.state.loading ? (
          <Loading />
        ) : (
          <BrandsList brands={this.state.brands} />
        )}
      </div>
    );
  }
}

BrandsPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withApollo(BrandsPage));
