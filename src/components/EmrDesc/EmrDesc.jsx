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

  return (
    <div>
      <div className="mb-2">Khoa: Khoa {emr.room.name}</div>
      <Descriptions title="I. Hành chính" size="middle" bordered column={2} className="mb-5">
        <Item label="1. Họ và tên">{fullname}</Item>
        <Item label="2. Ngày sinh">{dayOfBirth}</Item>
        <Item label="3. Giới tính">{gender}</Item>
        <Item label="4. Nghề nghiệp">{job}</Item>
        <Item label="5. Dân tộc">{ethnicity}</Item>
        <Item label="6. Ngoại kiều">{expatriate}</Item>
        <Item label="7. Địa chỉ" span={2}>{address}</Item>
        <Item label="8. Nơi làm việc">{workplace}</Item>
        <Item label="9. Đối tượng">{object}</Item>
        <Item label="10. BHYT giá trị đến ngày">{insurance_expirity}</Item>
        <Item label="Số thẻ BHYT">{insurance_number}</Item>
        <Item label="11. Họ tên, địa chỉ người nhà khi cần báo tin" span={2}>{family_member_name}, {family_member_address}</Item>
        <Item label="Điện thoại số">{phone}</Item>
        <Item label="12. Đến khám bệnh lúc">{checkin_at}</Item>
        <Item label="13. Chẩn đoán của nơi giới thiệu">{previous_diagnose} ({come_from})</Item>
      </Descriptions>
      <Descriptions title="II. Lý do vào viện" bordered size="middle" className="mb-5">
        <Item label="Lý do vào viện">{present_complaint}</Item>
      </Descriptions>

      <Descriptions title="III. Hỏi bệnh" bordered layout="vertical" column={2} className="mb-5">
        <Item label="1. Quá trình bệnh lý" span={2}>
          <div dangerouslySetInnerHTML={{ __html: pathological_process }} className="whitespace-pre-line"></div>
        </Item>
        <Item label="2. Tiền sử bệnh bản thân">{self_medical_history}</Item>
        <Item label="Gia đình">{family_medical_history}</Item>
      </Descriptions>

      <Descriptions title="IV. Khám bệnh" bordered column={2} layout="vertical" className="mb-5">
        <Item label="1. Toàn thân" className="align-baseline">
          <div dangerouslySetInnerHTML={{ __html: body }} className="whitespace-pre-line"></div>
        </Item>
        <Item label="Dấu hiệu sinh tồn">
          <div>Mạch: {heartbeat} <i className="ml-auto">lần/ph</i></div>
          <div>Nhiệt độ: {temperature} <i className="ml-auto">°C</i></div>
          <div>Huyết áp: {blood_pressure} <i className="ml-auto">mmHg</i></div>
          <div>Nhịp thở: {breathing} <i className="ml-auto">lần/ph</i></div>
          <div>Cân nặng: {weight} <i className="ml-auto">kg</i></div>
        </Item>
        <Item label="2. Các bộ phận" span={2} className="align-baseline">
          <div dangerouslySetInnerHTML={{ __html: partials }} className="whitespace-pre-line"></div>
        </Item>
        <Item label="3. Tóm tắt kết quả cận lâm sàng" span={2}>
          <div dangerouslySetInnerHTML={{ __html: subclinical_summary }} className="whitespace-pre-line"></div>
        </Item>
        <Item label="4. Chẩn đoán ban đầu" span={2}>{initial_diagnose?.disease}</Item>
        <Item label="5. Thuốc">
          {
            drugs?.map((d, index) => {
              return <div key={index}>{d.drug} x {d.total} ({d.drugInstruction})</div>
            })
          }
        </Item>
        <Item label="Đã xử lý">
          <div dangerouslySetInnerHTML={{ __html: processed }} className="whitespace-pre-line"></div>
        </Item>
        <Item label="6. Chẩn đoán khi ra viện" span={2}>{diagnose?.disease}</Item>
        <Item label="7. Điều trị ngoại trú">Từ ngày {from_date} đến ngày {to_date}</Item>
      </Descriptions>

      <Descriptions title="Tổng kết bệnh án" bordered layout="vertical" column={2}>
        <Item label="1. Quá trình bệnh lý và diễn biến lâm sàng" span={2}>
          <div dangerouslySetInnerHTML={{ __html: pathological_process_and_clinical_course }} className="whitespace-pre-line"></div>
        </Item>
        <Item label="2. Tóm tắt kết quả xét nghiệm cận lâm sàng có giá trị chẩn đoán" span={2}>
          <div dangerouslySetInnerHTML={{ __html: valuable_subclinical_summary }} className="whitespace-pre-line"></div>
        </Item>
        <Item label="3. Chẩn đoán ra viện" span={2}>
          <div>Bệnh chính: {primary_disease?.disease}</div>
          <div>Bệnh kèm theo (nếu có): {sub_disease?.disease}</div>
        </Item>
        <Item label="4. Phương pháp điều trị" span={2}>
          <div dangerouslySetInnerHTML={{ __html: treatment_method }} className="whitespace-pre-line"></div>
        </Item>
        <Item label="5. Tình trạng người bệnh ra viện">
          <div dangerouslySetInnerHTML={{ __html: patient_status }} className="whitespace-pre-line"></div>
        </Item>
        <Item label="6. Hướng điều trị và các chế độ tiếp theo">
          <div dangerouslySetInnerHTML={{ __html: direction_of_treatment }} className="whitespace-pre-line"></div>
        </Item>
        <Item label="Dịch vụ">
          {
            services?.map((s, i) => (
              <div key={i}>{s.name || s.id}</div>
            ))
          }
        </Item>
        <Item label="Tệp đính kèm">
          {
            attachments?.map((a, i) => (
              <img src={a.url} key={i} style={{width: 200}} />
            ))
          }
        </Item>
      </Descriptions>
    </div>
  )
}

export default EmrDesc;