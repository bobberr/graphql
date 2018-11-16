import React from "react";
import { Modal } from "antd";

class EditBrandModal extends React.Component {
  state = {
    visible: false,
    confirmLoading: false
  };
  showModal = brandId => {
    this.setState({ visible: true }, () => {
      console.log(brandId);
    });
  };
  render() {
    const { visible } = this.state;
    return <Modal visible={visible}>this is modal</Modal>;
  }
}

export default EditBrandModal;
