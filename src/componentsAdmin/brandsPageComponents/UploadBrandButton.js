import React from "react";
import { Upload, Icon, Modal } from "antd";
import injectSheet from "react-jss";

const classes = {
  buttonContainer: {}
};

class UploadBrandButton extends React.Component {
  state = {
    previewVisible: false,
    previewImage: "",
    fileList: []
  };

  handleChange = ({ fileList }) => {
    this.setState({ fileList });
    this.props.onLogoUpload(fileList[0]);
  };

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    });
  };

  handleCancel = () => this.setState({ previewVisible: false });

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
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
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
          style={{ marginTop: "100px" }}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default injectSheet(classes)(UploadBrandButton);
