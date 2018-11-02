import React from "react";
import PropTypes from "prop-types";
import { withApollo } from "react-apollo";
import gql from "graphql-tag";
import injectSheet from "react-jss";
import { Input, Form, Button } from "antd";
import UploadBrandButton from "./UploadBrandButton";

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
    logoFile: null
  };

  // When form is being submitted - validate input fields and if success, do mutation -> clear input value
  _submitAddBrand = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({ loading: true });
        await this.props.client.mutate({
          mutation: addBrandMutation,
          variables: {
            name: values.brandName,
            file: this.state.logoFile
          }
        });
        this.props.form.setFieldsValue({
          brandName: ""
        });
        this.setState({ loading: false });
      }
    });
  };

  setLogoFile = logoFile => {
    this.setState({ logoFile });
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
            <UploadBrandButton onLogoUpload={this.setLogoFile} />
            <input
              type="file"
              onChange={({ target }) => {
                console.log(target.files);
              }}
            />
          </FormItem>
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
