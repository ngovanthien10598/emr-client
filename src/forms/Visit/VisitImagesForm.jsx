import React, { useState } from 'react';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { API_URL } from 'constant/apiUrl';
import Cookie from 'js-cookie';
import { getBase64 } from 'utils/image';

// APIs
import { removeImageAPI } from 'services/user/emr.service';

const VisitImagesForm = props => {

  const { emrId, fileList } = props;

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  // const [fileList, setFileList] = useState([]);
  const token = Cookie.get('EMR_token');

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Tải lên</div>
    </div>
  );

  function handleChange(uploadEvent) {
    props.onChange(uploadEvent)
  }

  async function handlePreview(file) {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1),);
  }

  function handleCancel() {
    setPreviewVisible(false);
  }

  async function handleRemove(file) {
    try {
      await removeImageAPI(emrId, file.id);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Upload
        onChange={handleChange}
        listType="picture-card"
        fileList={fileList}
        action={`${API_URL}/user/emr/${emrId}/image/`}
        name="image"
        headers={{ Authorization: `Bearer ${token}` }}
        onPreview={handlePreview}
        onRemove={handleRemove}>
        {uploadButton}
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}>
        <img src={previewImage} alt="" style={{ width: '100%' }} />
      </Modal>
    </>
  )
}

export default VisitImagesForm;