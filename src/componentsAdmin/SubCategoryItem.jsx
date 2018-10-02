import React from "react";
import gql from "graphql-tag";

const deleteSubCategoryMutation = gql`
  mutation deleteSubCategoryMutation($category: String, $name: String) {
    deleteSubCategoryMutation(category: $category, name: $name) {
      name
      category
      _id
    }
  }
`;

const checkItemsInSubCategory = gql`
  query checkItemsInSubCategory($category: String, $subCategory: String) {
    checkItemsInSubCategory(category: $category, subCategory: $subCategory)
  }
`;

class SubCategoryItem extends React.Component {
  state = { open: false };
  checkItemsHandler = () => {
    this.props.client
      .query({
        query: checkItemsInSubCategory,
        variables: {
          category: this.props.categoryName,
          subCategory: this.props.name
        },
        fetchPolicy: "network-only"
      })
      .then(returned => {
        if (returned.data.checkItemsInSubCategory) {
          this.setState({ open: true });
        } else {
          this.deleteItemHandler();
        }
      });
  };
  deleteItemHandler = e => {
    this.props.client
      .mutate({
        mutation: deleteSubCategoryMutation,
        variables: { category: this.props.categoryName, name: this.props.name }
      })
      .then(returned => {
        this.props.setSubCategories(returned.data.deleteSubCategoryMutation);
        this.props.resetStateForItemPage();
      });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    return (
      <li>
        <span>{this.props.name} </span>
        <button onClick={this.checkItemsHandler}>X</button>
      </li>
    );
  }
}

export default SubCategoryItem;
