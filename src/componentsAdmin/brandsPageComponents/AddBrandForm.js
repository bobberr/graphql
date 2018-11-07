import React from "react";
import PropTypes from "prop-types";
import { withApollo } from "react-apollo";
import gql from "graphql-tag";
import injectSheet from "react-jss";
import { Input, Form, Button, AutoComplete } from "antd";
import UploadBrandButton from "./UploadBrandButton";
import { listOfCountries } from "../../configs/listOfCountries";

const FormItem = Form.Item;

const classes = {
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
  button: {
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
    color: "#9a9a9a",
    background: "transparent"
  },
  error: {
    color: "red",
    transition: "opacity .2s linear",
    marginBottom: "5px"
  },
  visibleError: {
    opacity: 1
  },
  hidenError: {
    opacity: 0
  }
};

const addBrandMutation = gql`
  mutation AddBrandFormMutation(
    $brandName: String!
    $file: Upload!
    $brandCountry: String!
    $startYear: Int!
    $endYear: Int!
  ) {
    addBrand(
      brandName: $brandName
      file: $file
      brandCountry: $brandCountry
      startYear: $startYear
      endYear: $endYear
    ) {
      brandName
    }
  }
`;

class AddBrandForm extends React.Component {
  // loading - for rendering spiner in button during creation of the brand
  // fileList - list of brand logos
  // imageError - flag for required validation of logo
  // countriesToShow - filtered list of countries for autocomplete to show
  state = {
    loading: false,
    fileList: [],
    imageError: false,
    countriesToShow: []
  };

  // Set all countries for showing in autocomplete
  componentDidMount() {
    this.setState({ countriesToShow: listOfCountries });
  }

  // When form is being submitted - validate input fields and if success, do mutation -> clear input value
  // -> clear fileList for empty image area
  _submitAddBrand = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      // If there is no image for brand - set required flag
      if (this.state.fileList.length <= 0) {
        this.setState({ imageError: true });
        return;
      }
      if (!err) {
        const { brandName, brandCountry, startYear, endYear } = values;
        this.setState({ loading: true }, async () => {
          await this.props.client.mutate({
            mutation: addBrandMutation,
            variables: {
              brandName,
              file: this.state.fileList[0],
              brandCountry,
              startYear,
              endYear
            }
          });
          // Clear input values
          this.props.form.setFieldsValue({
            brandName: "",
            brandCountry: "",
            startYear: "",
            endYear: ""
          });
          // Finish loading, set image list to empty array so there is no image after submiting form for preview
          this.setState({
            loading: false,
            fileList: []
          });
        });
      }
    });
  };

  // Method is passed to UploadBrandButton for seting fileList
  // to parent component for appropriate work of clearing fileList after submitting form
  setLogoFile = fileList => {
    this.setState({ fileList, imageError: false });
  };

  // Filtering among the countries
  _onSearchCountry = value => {
    const filteredCountries = listOfCountries.filter(country => {
      return country.toLowerCase().search(value.toLowerCase()) !== -1;
    });
    this.setState({ countriesToShow: filteredCountries });
  };

  // Validation of the start year of the brand - if it's further than end date -> set message
  _validateStartYear = (rule, value, callback) => {
    const { form } = this.props;
    if (Number(value) > Number(form.getFieldValue("endYear"))) {
      callback("Start year is incorrect");
    } else {
      callback();
    }
  };

  // Validation of the end year of the brand - if it's earlier than start data -> set message
  _validateEndYear = (rule, value, callback) => {
    const { form } = this.props;
    if (Number(value) < Number(form.getFieldValue("startYear"))) {
      callback("End year is incorrect");
    } else {
      callback();
    }
  };

  render() {
    const { classes } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={classes.addBrandContainer}>
        <h3 className={classes.addBrandTitle}>Add brand</h3>
        <Form onSubmit={this._submitAddBrand}>
          <FormItem>
            {/* Validating input fields */}
            {getFieldDecorator("brandName", {
              rules: [
                {
                  required: true,
                  message: "Please input brand name"
                }
              ]
            })(
              <Input placeholder="Brand name" className={classes.inputRoot} />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("brandCountry", {
              rules: [
                {
                  required: true,
                  message: "Please select country"
                }
              ]
            })(
              <AutoComplete
                placeholder="Input country of origin"
                dataSource={this.state.countriesToShow}
                onSearch={this._onSearchCountry}
                className={classes.inputRoot}
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("startYear", {
              rules: [
                {
                  required: true,
                  message: "Please input start year"
                },
                {
                  validator: this._validateStartYear
                }
              ]
            })(
              <Input
                placeholder="Start year"
                type="number"
                className={classes.inputRoot}
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("endYear", {
              rules: [
                {
                  required: true,
                  message: "Please input end year"
                },
                {
                  validator: this._validateEndYear
                }
              ]
            })(
              <Input
                placeholder="End year"
                type="number"
                className={classes.inputRoot}
              />
            )}
          </FormItem>
          <UploadBrandButton
            fileList={this.state.fileList}
            onLogoUpload={this.setLogoFile}
          />
          <p
            className={
              classes.error +
              " " +
              (this.state.imageError
                ? classes.visibleError
                : classes.hidenError)
            }
          >
            Image is required
          </p>
          {/* If loading - render loading circle and text */}
          <Button type="primary" htmlType="submit" loading={this.state.loading}>
            {this.state.loading ? "Loading" : "Create"}
          </Button>
        </Form>
      </div>
    );
  }
}

AddBrandForm.propTypes = {
  classes: PropTypes.object.isRequired
};

// Initializing antd Form, injecting styles and consuming apollo client
export default withApollo(injectSheet(classes)(Form.create()(AddBrandForm)));
