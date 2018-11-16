import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import uuidv4 from "uuid/v4";
import Loading from "../../components/Loading";
import { withApollo } from "react-apollo";
import injectSheet from "react-jss";
import { Menu, Input } from "antd";

const styles = {
  listContainer: {
    background: "#27293D",
    width: "250px",
    padding: "20px 30px",
    marginRight: "50px"
  },
  input: {
    background: "transparent",
    color: "white",
    borderRadius: "5px 5px 0 0"
  },
  hint: {
    fontSize: "14px",
    marginTop: "30px"
  }
};

// Subscription for adding newly added brand to list
const BRANDS_SUBSCRIPTION = gql`
  subscription onBrandAdded {
    brandAdded {
      _id
      brandName
    }
  }
`;

const query = gql`
  query getAllBrands {
    getAllBrands {
      _id
      brandName
    }
  }
`;

class BrandsList extends React.Component {
  state = {
    brandToSearch: "",
    loading: true,
    brands: [],
    brandsToShow: [],
    activeBrand: {}
  };

  // Getting list of all brands and subscribing for newly created brands
  componentDidMount = async () => {
    const queryResult = await this.props.client.query({
      query,
      fetchPolicy: "network-only"
    });
    this.setState({
      loading: queryResult.loading,
      brands: queryResult.data.getAllBrands,
      brandsToShow: queryResult.data.getAllBrands
    });
    this._subscribe();
  };

  // Unsubscribing on unmount
  componentWillUnmount = () => {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  };

  // Subscription and setting updated list of brands
  _subscribe = () => {
    this.subscription = this.props.client
      .subscribe({
        query: BRANDS_SUBSCRIPTION
      })
      .subscribe(payload => {
        // If filtering input is empty - set updated brands list to both brandsLists
        // If filter isn't empty - brandsToShow is the same because user filters list
        // and we don't need to append new item to list
        this.setState(prevState => {
          const newBrandsList = [...prevState.brands, payload.data.brandAdded];
          return {
            brands: newBrandsList,
            brandsToShow:
              prevState.brandToSearch.length === 0
                ? newBrandsList
                : prevState.brandsToShow
          };
        });
      });
  };

  _onBrandNameInput = e => {
    const inputValue = e.target.value;
    let filteredBrands = this.state.brands;
    filteredBrands = filteredBrands.filter(brand => {
      return (
        brand.brandName.toLowerCase().search(inputValue.toLowerCase()) !== -1
      );
    });
    this.setState({
      brandsToShow: filteredBrands,
      brandToSearch: inputValue
    });
  };

  render() {
    const { classes } = this.props;
    const { brandsToShow } = this.state;
    // List items
    const brandListItems = brandsToShow.map(brand => {
      return (
        <Menu.Item key={uuidv4()}>
          <span>{brand.brandName}</span>
        </Menu.Item>
      );
    });

    return (
      <div className={classes.listContainer}>
        {/* If loading - render loader */}
        {this.state.loading ? (
          <Loading />
        ) : (
          // Else - render list
          <div>
            <Input
              className={classes.input}
              placeholder="Brand name"
              onChange={this._onBrandNameInput}
            />
            {/* If brands list is empty - render "There are no brands" */}
            {brandListItems.length === 0 ? (
              <p className={classes.hint}>There are no brands to display</p>
            ) : (
              // Else - render full list of brands
              <Menu component="ul" theme="dark">
                {brandListItems}
              </Menu>
            )}
          </div>
        )}
      </div>
    );
  }
}

BrandsList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectSheet(styles)(withApollo(BrandsList));
