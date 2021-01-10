import { Descriptions, Modal } from 'antd';
import EmptyPlaceholder from 'components/EmptyPlaceholder/EmptyPlaceholder';
import NullPlaceholder from 'components/NullPlaceholder/NullPlaceholder';
import React, { useState } from 'react';

const { Item } = Descriptions;

const EmrDesc = props => {
  const { emr, role } = props;
  const {
    medical_record: {
      administrative: {
        fullname,
        dayOfBirth,
        gender,
        job,
        ethnicity,
        expatriate,
        address,
        workplace,
        object,
        insurance_expirity,
        insurance_number,
        family_member_name,
        family_member_address,
        phone,
        checkin_at,
        previous_diagnose,
        come_from
      },
      present_complaint,
      ask: {
        pathological_process,
        self_medical_history,
        family_medical_history
      },
      examination: {
        heartbeat,
        temperature,
        blood_pressure,
        breathing,
        weight,
        body,
        partials,
        subclinical_summary,
        initial_diagnose,
        drugs,
        processed,
        diagnose,
        from_date,
        to_date
      },
      summary: {
        pathological_process_and_clinical_course,
        valuable_subclinical_summary,
        primary_disease,
        sub_disease,
        treatment_method,
        patient_status,
        direction_of_treatment,
        services,
        attachments
      }
    }
  } = emr;
  const [selectedImage, setSelectedImage] = useState('');
  const [showModal, setShowModal] = useState(false);

  function handleCloseModal() {
    setSelectedImage('');
    setShowModal(false);
  }

  function handleImageClick(url) {
    setSelectedImage(url);
    setShowModal(true);
  }

  return (
    <div>
      <div className="mb-2">Phòng khám: {emr.room.name}</div>
      <div className="mb-2">Cập nhật bởi: bác sĩ <strong>{emr.physician.first_name} {emr.physician.last_name}</strong></div>
      <Descriptions title="I. Hành chính" size="middle" bordered column={2} className="mb-5">
        <Item label="1. Họ và tên">{fullname || NullPlaceholder}</Item>
        <Item label="2. Ngày sinh">{dayOfBirth || NullPlaceholder}</Item>
        <Item label="3. Giới tính">{gender || NullPlaceholder}</Item>
        <Item label="4. Nghề nghiệp">{job || NullPlaceholder}</Item>
        <Item label="5. Dân tộc">{ethnicity || NullPlaceholder}</Item>
        <Item label="6. Ngoại kiều">{expatriate || NullPlaceholder}</Item>
        <Item label="7. Địa chỉ" span={2}>{address || NullPlaceholder}</Item>
        <Item label="8. Nơi làm việc">{workplace || NullPlaceholder}</Item>
        <Item label="9. Đối tượng">{object || NullPlaceholder}</Item>
        <Item label="10. BHYT giá trị đến ngày">{insurance_expirity || NullPlaceholder}</Item>
        <Item label="Số thẻ BHYT">{insurance_number || NullPlaceholder}</Item>
        <Item label="11. Họ tên, địa chỉ người nhà khi cần báo tin" span={2}>{family_member_name && family_member_address ? `${family_member_name}, ${family_member_address}` : NullPlaceholder}</Item>
        <Item label="Số điện thoại">{phone || NullPlaceholder}</Item>
        <Item label="12. Đến khám bệnh lúc">{checkin_at || NullPlaceholder}</Item>
        <Item label="13. Chẩn đoán của nơi giới thiệu">{previous_diagnose && come_from ? `${previous_diagnose} (${come_from})` : NullPlaceholder}</Item>
      </Descriptions>
      {
        role !== "patient" &&
        <>
          <Descriptions title="II. Lý do vào viện" bordered size="middle" className="mb-5">
            <Item label="Lý do vào viện">{present_complaint || EmptyPlaceholder}</Item>
          </Descriptions>

          <Descriptions title="III. Hỏi bệnh" bordered layout="vertical" column={2} className="mb-5">
            <Item label="1. Quá trình bệnh lý" span={2}>
              <div dangerouslySetInnerHTML={{ __html: pathological_process || "Chưa cập nhật" }} className="whitespace-pre-line"></div>
            </Item>
            <Item label="2. Tiền sử bệnh bản thân">{self_medical_history || "Chưa cập nhật"}</Item>
            <Item label="Gia đình">{family_medical_history || "Chưa cập nhật"}</Item>
          </Descriptions>

          <Descriptions title="IV. Khám bệnh" bordered column={2} layout="vertical" className="mb-5">
            <Item label="1. Toàn thân" className="align-baseline">
              <div dangerouslySetInnerHTML={{ __html: body || "Chưa cập nhật" }} className="whitespace-pre-line"></div>
            </Item>
            <Item label="Dấu hiệu sinh tồn">
              <div>Mạch: {heartbeat || EmptyPlaceholder} <i className="ml-auto">lần/ph</i></div>
              <div>Nhiệt độ: {temperature || EmptyPlaceholder} <i className="ml-auto">°C</i></div>
              <div>Huyết áp: {blood_pressure || EmptyPlaceholder} <i className="ml-auto">mmHg</i></div>
              <div>Nhịp thở: {breathing || EmptyPlaceholder} <i className="ml-auto">lần/ph</i></div>
              <div>Cân nặng: {weight || EmptyPlaceholder} <i className="ml-auto">kg</i></div>
            </Item>
            <Item label="2. Các bộ phận" span={2} className="align-baseline">
              <div dangerouslySetInnerHTML={{ __html: partials || "Chưa cập nhật" }} className="whitespace-pre-line"></div>
            </Item>
            <Item label="3. Tóm tắt kết quả cận lâm sàng" span={2}>
              <div dangerouslySetInnerHTML={{ __html: subclinical_summary || "Chưa cập nhật" }} className="whitespace-pre-line"></div>
            </Item>
            <Item label="4. Chẩn đoán ban đầu" span={2}>{initial_diagnose?.disease || NullPlaceholder}</Item>
            <Item label="5. Thuốc">
              {
                drugs?.map((d, index) => {
                  return <div key={index}>{d.drug} x {d.total} ({d.drugInstruction})</div>
                }) || NullPlaceholder
              }
            </Item>
            <Item label="Đã xử lý">
              <div dangerouslySetInnerHTML={{ __html: processed || "Chưa cập nhật" }} className="whitespace-pre-line"></div>
            </Item>
            <Item label="6. Chẩn đoán khi ra viện" span={2}>{diagnose?.disease || NullPlaceholder}</Item>
            <Item label="7. Điều trị ngoại trú">{from_date && to_date ? `Từ ngày ${from_date} đến ngày ${to_date}` : NullPlaceholder}</Item>
          </Descriptions>
        </>
      }

      <Descriptions title="Tổng kết bệnh án" bordered layout="vertical" column={2}>
        <Item label="1. Quá trình bệnh lý và diễn biến lâm sàng" span={2}>
          <div dangerouslySetInnerHTML={{ __html: pathological_process_and_clinical_course || "Chưa cập nhật" }} className="whitespace-pre-line"></div>
        </Item>
        <Item label="2. Tóm tắt kết quả xét nghiệm cận lâm sàng có giá trị chẩn đoán" span={2}>
          <div dangerouslySetInnerHTML={{ __html: valuable_subclinical_summary || "Chưa cập nhật" }} className="whitespace-pre-line"></div>
        </Item>
        <Item label="3. Chẩn đoán ra viện" span={2}>
          <div>Bệnh chính: {primary_disease?.disease || "Không"}</div>
          <div>Bệnh kèm theo (nếu có): {sub_disease?.disease || "Không"}</div>
        </Item>
        <Item label="4. Phương pháp điều trị" span={2}>
          <div dangerouslySetInnerHTML={{ __html: treatment_method || "Chưa cập nhật" }} className="whitespace-pre-line"></div>
        </Item>
        <Item label="5. Tình trạng người bệnh ra viện">
          <div dangerouslySetInnerHTML={{ __html: patient_status || "Chưa cập nhật" }} className="whitespace-pre-line"></div>
        </Item>
        <Item label="6. Hướng điều trị và các chế độ tiếp theo">
          <div dangerouslySetInnerHTML={{ __html: direction_of_treatment || "Chưa cập nhật" }} className="whitespace-pre-line"></div>
        </Item>
        {
          role !== "patient" &&
          <Item label="Dịch vụ" className="align-baseline">
            {
              services?.map((s, i) => (
                <div key={i}>{i + 1}. {s.name || s.id}</div>
              )) || EmptyPlaceholder
            }
          </Item>
        }
        {
          role !== "patient" &&
          <Item label="Tệp đính kèm">
            {
              attachments && attachments.length > 0 && attachments.map((a, i) => (
                <img src={a.url} key={i} style={{ width: 200 }} onClick={() => handleImageClick(a.url)} />
              )) || EmptyPlaceholder
            }
          </Item>
        }
      </Descriptions>

      <Modal
        visible={showModal}
        title="Hình ảnh"
        onOk={handleCloseModal}
        onCancel={handleCloseModal}>
        <img src={selectedImage} style={{ width: '100%' }} />
      </Modal>
    </div>
  )
}

export default EmrDesc;