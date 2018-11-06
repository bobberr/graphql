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
    color: "#9a9a9a"
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
  mutation AddBrandFormMutation($name: String!, $file: Upload!) {
    addBrand(name: $name, file: $file) {
      name
    }
  }
`;

class AddBrandForm extends React.Component {
  state = {
    loading: false,
    fileList: [],
    imageError: false,
    countriesToShow: []
  };

  componentDidMount() {
    this.setState({ countriesToShow: listOfCountries });
  }

  // When form is being submitted - validate input fields and if success, do mutation -> clear input value
  _submitAddBrand = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (this.state.fileList.length <= 0) {
        this.setState({ imageError: true });
        return;
      }
      if (!err) {
        this.setState({ loading: true }, async () => {
          await this.props.client.mutate({
            mutation: addBrandMutation,
            variables: {
              name: values.brandName,
              file: this.state.fileList[0]
            }
          });
          this.props.form.setFieldsValue({
            brandName: ""
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

  setLogoFile = fileList => {
    this.setState({ fileList, imageError: false });
  };

  _onSearchCountry = value => {
    const filteredCountries = listOfCountries.filter(country => {
      return country.toLowerCase().search(value.toLowerCase()) !== -1;
    });
    this.setState({ countriesToShow: filteredCountries });
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
