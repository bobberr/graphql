import React from "react";
import gql from "graphql-tag";
import { withApollo } from "react-apollo";

const query = gql`
  query getAllBrands {
    getAllBrands {
      name
    }
  }
`;

class BrandsPage extends React.Component {
  state = {
    loading: true
  };

  async componentDidMount() {
    const queryResult = await this.props.client.query({ query });
    console.log(queryResult);
  }

  render() {
    return <div>this is brands page</div>;
  }
}

export default withApollo(BrandsPage);
