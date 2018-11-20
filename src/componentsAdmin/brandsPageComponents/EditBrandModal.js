import React from "react";
import { Modal, Form, Input, AutoComplete } from "antd";
import Loading from "../../components/Loading";
import injectSheet from "react-jss";
import { listOfCountries } from "../../configs/listOfCountries";

const FormItem = Form.Item;

const classes = {
  inputRoot: {
    color: "#9a9a9a !important",
    background: "transparent"
  }
};

class EditBrandModal extends React.Component {
  state = {
    countriesToShow: []
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
    const newEndYear = form.getFieldValue("newEndYear");
    if (newEndYear) {
      if (Number(value) > Number(newEndYear)) {
        callback("Start year is incorrect");
      } else {
        callback();
      }
    } else {
      callback();
    }
  };

  // Validation of the end year of the brand - if it's earlier than start data -> set message
  _validateEndYear = (rule, value, callback) => {
    const { form } = this.props;
    if (Number(value) < Number(form.getFieldValue("newStartYear"))) {
      callback("End year is incorrect");
    } else {
      callback();
    }
  };

  _handleCancel = () => {
    const { form, handleCancel } = this.props;
    form.resetFields();
    handleCancel();
  };

  _handleOk = () => {
    const { form, handleOk, brandToEdit } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        const {
          newBrandName,
          newBrandCountry,
          newStartYear,
          newEndYear
        } = values;
        handleOk(
          newBrandName,
          newBrandCountry,
          newStartYear,
          newEndYear,
          brandToEdit._id
        );
        form.resetFields();
      }
    });
  };

  render() {
    const {
      visible,
      confirmLoading,
      brandToEdit,
      classes,
      brandNameDuplication
    } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { brandName, brandCountry, startYear, endYear } = brandToEdit;
    return (
      <Modal
        className={classes.modalRoot}
        centered
        visible={visible}
        onCancel={this._handleCancel}
        confirmLoading={confirmLoading}
        onOk={this._handleOk}
      >
        {brandToEdit ? (
          <div>
            <p>Edit information about {brandName}</p>
            <Form>
              <FormItem
                validateStatus={brandNameDuplication ? "error" : null}
                help={
                  brandNameDuplication ? "Brand with such name exists" : null
                }
              >
                {/* Validating input fields */}
                {getFieldDecorator("newBrandName", {
                  rules: [
                    {
                      required: true,
                      message: "Please input brand name"
                    }
                  ],
                  initialValue: brandName
                })(
                  <Input
                    placeholder="Brand name"
                    className={classes.inputRoot}
                  />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator("newBrandCountry", {
                  rules: [
                    {
                      required: true,
                      message: "Please select country"
                    }
                  ],
                  initialValue: brandCountry
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
                {getFieldDecorator("newStartYear", {
                  rules: [
                    {
                      required: true,
                      message: "Please input start year"
                    },
                    {
                      validator: this._validateStartYear
                    }
                  ],
                  initialValue: startYear
                })(
                  <Input
                    placeholder="Start year"
                    type="number"
                    className={classes.inputRoot}
                  />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator("newEndYear", {
                  rules: [
                    {
                      required: true,
                      message: "Please input end year"
                    },
                    {
                      validator: this._validateEndYear
                    }
                  ],
                  initialValue: endYear
                })(
                  <Input
                    placeholder="End year"
                    type="number"
                    className={classes.inputRoot}
                  />
                )}
              </FormItem>
            </Form>
          </div>
        ) : (
          <Loading />
        )}
      </Modal>
    );
  }
}

export default injectSheet(classes)(Form.create()(EditBrandModal));
