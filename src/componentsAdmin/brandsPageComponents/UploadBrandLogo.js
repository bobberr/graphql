import React from "react";
import { Upload, Icon, Modal } from "antd";
import injectSheet from "react-jss";

const classes = {
  buttonContainer: {}
};

class UploadBrandLogo extends React.Component {
  state = {
    previewVisible: false,
    previewImage: ""
  };

  _handleChange = ({ fileList }) => {
    this.props.onLogoUpload(fileList);
  };

  _handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    });
  };

  _handleCancel = () => this.setState({ previewVisible: false });

  render() {
    const { previewVisible, previewImage } = this.state;
    const { fileList } = this.props;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className={classes.buttonContainer}>
        <Upload
          action="//jsonplaceholder.typicode.com/posts/"
          listType="picture-card"
          fileList={fileList}
          onPreview={this._handlePreview}
          onChange={this._handleChange}
          accept=".jpeg,.jpg"
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this._handleCancel}
          style={{ marginTop: "100px" }}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default injectSheet(classes)(UploadBrandLogo);
