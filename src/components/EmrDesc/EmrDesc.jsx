import { Descriptions } from 'antd';
import React from 'react';

const { Item } = Descriptions;

const EmrDesc = props => {
  const { emr } = props;
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
      ask,
      examination,
      summary
    }
  } = emr;

  return (
    <div>
      <div className="mb-2">Khoa: Khoa {emr.room.name}</div>
      <Descriptions title="Hành chính" size="middle" bordered column={2}>
        <Item label="1. Họ và tên">{fullname}</Item>
        <Item label="2. Ngày sinh">{dayOfBirth}</Item>
        <Item label="3. Giới tính">{gender}</Item>
        <Item label="4. Nghề nghiệp">{job}</Item>
        <Item label="5. Dân tộc">{ethnicity}</Item>
        <Item label="6. Ngoại kiều">{expatriate}</Item>
        <Item label="7. Địa chỉ">{address}</Item>
        <Item label="8. Nơi làm việc">{workplace}</Item>
        <Item label="9. Đối tượng">{object}</Item>
        <Item label="10. BHYT giá trị đến ngày">{insurance_expirity}</Item>
        <Item label="Số thẻ BHYT">{insurance_number}</Item>
        <Item label="11. Họ tên, địa chỉ người nhà khi cần báo tin">{family_member_name}, {family_member_address}</Item>
        <Item label="Điện thoại số">{phone}</Item>
        <Item label="12. Đến khám bệnh lúc">{checkin_at}</Item>
        <Item label="13. Chẩn đoán của nơi giới thiệu">{previous_diagnose} ({come_from})</Item>
      </Descriptions>
    </div>
  )
}

export default EmrDesc;