
import { Form, Select } from "antd";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase-config";
const { Option } = Select;

function PrefixSelector ({ name, initial }) {
    const [codes, setCodes] = useState([])

    useEffect(() => {
        getDoc(doc(db, "standardInfo", "countryCodes")).then((res) => {
            setCodes(res.data().countries);
        })
    }, [])

    return (
      <Form.Item name={name} initialValue={initial || ""} noStyle>
        <Select
          allowClear={true}
          showSearch
          bordered={false}
          style={{
            width: 80,
            background: "#ffffff",
            borderRadius: "4px"
          }}
        >
          {codes.map((e) => (
            <Option key={e?.code} value={e?.code}>
              {e?.code}{" "}
            </Option>
          ))}
        </Select>
      </Form.Item>
    );
} 

export default PrefixSelector;