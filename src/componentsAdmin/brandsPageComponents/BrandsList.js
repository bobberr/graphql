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
    width: "220px",
    padding: "0 30px",
    marginRight: "50px"
  },
  listItemText: {
    color: "#9a9a9a"
  },
  formControl: {
    width: "100%"
  },
  inputLabel: {
    color: "#9a9a9a"
  }
};

// Subscription for adding newly added brand to list
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
    brandToSearch: "",
    loading: true,
    brands: [],
    brandsToShow: []
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
      return brand.name.toLowerCase().search(inputValue.toLowerCase()) !== -1;
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
          <span>{brand.name}</span>
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
            <Input placeholder="Brand name" onChange={this._onBrandNameInput} />
            {/* If brands list is empty - render "There are no brands" */}
            {brandListItems.length === 0 ? (
              <p>There are no brands to display</p>
            ) : (
              // Else - render full list of brands
              <Menu component="ul">{brandListItems}</Menu>
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
