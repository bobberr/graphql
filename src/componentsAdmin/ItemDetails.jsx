import React from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import gql from "graphql-tag";
import { withApollo } from "react-apollo";

const addSpecToItemMutation = gql`
  mutation addSpecToItemMutation($_id: ID, $name: String, $value: String) {
    addSpecToItemMutation(_id: $_id, name: $name, value: $value) {
      category
      subCategory
      brand
      model
      _id
      specs {
        name
        value
      }
      img
    }
  }
`;

const deleteSpecMutation = gql`
  mutation deleteSpecMutation($_id: ID, $name: String, $value: String) {
    deleteSpecMutation(_id: $_id, name: $name, value: $value) {
      category
      subCategory
      brand
      model
      _id
      specs {
        name
        value
      }
      img
    }
  }
`;

class ItemDetails extends React.Component {
  state = { emptyInput: false };
  addSpecHandler = e => {
    e.preventDefault();
    if (this.name.input.value === "" || this.value.input.value === "") {
      this.setState({ emptyInput: true });
      return null;
    } else {
      this.setState({ emptyInput: false });
      this.props.client
        .mutate({
          mutation: addSpecToItemMutation,
          variables: {
            _id: this.props.activeItem._id,
            name: this.name.input.value,
            value: this.value.input.value
          }
        })
        .then(returned => {
          this.props.setActiveItem(returned.data.addSpecToItemMutation);
        });
    }
  };
  deleteSpecHandler = (name, value) => {
    this.props.client.mutate({
      mutation: deleteSpecMutation,
      variables: {
        _id: this.props.activeItem._id,
        name,
        value
      }
    });
  };
  componentWillReceiveProps = () => {
    this.setState({ emptyInput: false });
    this.name.input.value = null;
    this.value.input.value = null;
  };
  render() {
    const activeItem = this.props.activeItem;
    const specs = activeItem.specs.map((spec, index) => {
      return (
        <li key={index}>
          Name: <span>{spec.name}</span> Value: <span>{spec.value}</span>
          <button
            onClick={this.deleteSpecHandler.bind(null, spec.name, spec.value)}
          >
            x
          </button>
        </li>
      );
    });
    return (
      <div>
        <h4>Brand: {activeItem.brand}</h4>
        <span>Model: {activeItem.model}</span>
        <form name="add-spec">
          <TextField
            ref={ref => {
              this.name = ref;
            }}
            floatingLabelText="name"
            errorText={this.state.emptyInput ? "Required" : null}
          />
          <TextField
            ref={ref => {
              this.value = ref;
            }}
            floatingLabelText="value"
            errorText={this.state.emptyInput ? "Required" : null}
          />
          <RaisedButton
            onClick={this.addSpecHandler}
            type="submit"
            label="Add spec"
            primary={true}
          />
        </form>
        <ul>{specs}</ul>
      </div>
    );
  }
}

export default withApollo(ItemDetails);
