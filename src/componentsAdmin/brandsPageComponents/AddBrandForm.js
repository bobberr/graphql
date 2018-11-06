import React from "react";
import PropTypes from "prop-types";
import { withApollo } from "react-apollo";
import gql from "graphql-tag";
import injectSheet from "react-jss";
import { Input, Form, Button, AutoComplete } from "antd";
import UploadBrandButton from "./UploadBrandButton";

const FormItem = Form.Item;

const listOfCountries = [
  "United States",
  "Canada",
  "Afghanistan",
  "Albania",
  "Algeria",
  "American Samoa",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antarctica",
  "Antigua and/or Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Bouvet Island",
  "Brazil",
  "British Indian Ocean Territory",
  "Brunei Darussalam",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Cape Verde",
  "Cayman Islands",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Christmas Island",
  "Cocos (Keeling) Islands",
  "Colombia",
  "Comoros",
  "Congo",
  "Cook Islands",
  "Costa Rica",
  "Croatia (Hrvatska)",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "East Timor",
  "Ecudaor",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Falkland Islands (Malvinas)",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "France, Metropolitan",
  "French Guiana",
  "French Polynesia",
  "French Southern Territories",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guadeloupe",
  "Guam",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Heard and Mc Donald Islands",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran (Islamic Republic of)",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Ivory Coast",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea, Democratic People's Republic of",
  "Korea, Republic of",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Lao People's Democratic Republic",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libyan Arab Jamahiriya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macau",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Martinique",
  "Mauritania",
  "Mauritius",
  "Mayotte",
  "Mexico",
  "Micronesia, Federated States of",
  "Moldova, Republic of",
  "Monaco",
  "Mongolia",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "Netherlands Antilles",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Niue",
  "Norfork Island",
  "Northern Mariana Islands",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Pitcairn",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Reunion",
  "Romania",
  "Russian Federation",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Georgia South Sandwich Islands",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "St. Helena",
  "St. Pierre and Miquelon",
  "Sudan",
  "Suriname",
  "Svalbarn and Jan Mayen Islands",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syrian Arab Republic",
  "Taiwan",
  "Tajikistan",
  "Tanzania, United Republic of",
  "Thailand",
  "Togo",
  "Tokelau",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks and Caicos Islands",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States minor outlying islands",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City State",
  "Venezuela",
  "Vietnam",
  "Virigan Islands (British)",
  "Virgin Islands (U.S.)",
  "Wallis and Futuna Islands",
  "Western Sahara",
  "Yemen",
  "Yugoslavia",
  "Zaire",
  "Zambia",
  "Zimbabwe"
];

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
    imageError: false
  };

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

  _onSearchCountry = value => {};

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
                  message: "Please input brand's country of origin"
                }
              ]
            })(
              <AutoComplete
                placeholder="Input country of origin"
                dataSource={this.state.country}
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
