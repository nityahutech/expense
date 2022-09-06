
import React, { useState } from "react";
import 'antd/dist/antd.css';
import "../style/profile.css";
import { Card, Col, Row, Form, Input, Checkbox } from 'antd';
import { EnvironmentOutlined, CalendarOutlined,HomeOutlined} from '@ant-design/icons';
import { Button, message, Upload } from 'antd'
import "../style/profile.css";
import { Tabs } from 'antd';
import { Menu } from 'antd';
import Column from "antd/lib/table/Column";
import { Avatar } from 'antd';
import { Icon } from 'antd';

// import ImgCrop from 'antd-img-crop';
const { Meta } = Card;



// const onChange = (e) => {
//   console.log(`checked = ${e.target.checked}`);
// };


const Profile = () => {
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url:
        "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    }
  ]);
  const onPreview = async (file) => {
    let src = file.url;

    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);

        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };


  // const [tabPosition,] = useState('left');
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };


  return (
    <>

      <div className='profile' style={{ margin: "20px", background: '', }} >


        {/* <Tabs tabPosition={tabPosition} defaultActiveKey="1"> */}

        {/* <Tabs.TabPane tab="Profile" key="1"> */}
        <Row gutter={[48, 8]} style={{ background: '', display: "flex", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Col span={12}>
            <Card
              title="My Account"
              extra={<a href="#">Edit</a>}
              style={{
                width: 300,
                borderRadius:'10px'


              }}
            >
              <h3>About</h3>
              <p>Swayamprava Nanda</p>
              <h3>Contact</h3>
              <p>swayamprava@hutechsolutions.com +91-8073989712</p>
              <h3>Address</h3>
              <p>House no 163, 1st Floor, 9th Main Rd, Sector 6, HSR Layout, Bengaluru, Karnataka 560102</p>
            </Card>
          </Col>

          <Col span={12}>
      
            <div className="editimg" style={{ marginLeft: '70px', marginTop: '-30px', position: 'absolute', backgroundColor: 'white', borderRadius: '100%' }}>
      
            </div>


            <Card

              hoverable
              style={{
                width: 350,
                borderRadius: '50px',
                display: "flex", flexDirection: 'column', justifyContent: 'center', padding: '10px',

              }}

              // cover={<img style={{ 'borderRadius': '100%', border: '2px solid #e3d2d2', display: "flex", }} alt="example" src="/logo/Screenshot 2022-09-05 160547.png" />}
            >
              <div className="editimg" style={{}}>
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={fileList}
                  onChange={onChange}
                  onPreview={onPreview}
                >
                  {fileList.length < 1 && '+ Upload'}
                </Upload>
              </div>

              <h2>Swayamprava Nanda</h2>
              <ul
                style={{
                  listStyleType: "none",
                  display:"inline",
                  paddingLeft:'0'
                  
                }}>
              <li list-inline-item><HomeOutlined /> Humantech Solutions India Pvt. Ltd </li>
              <li list-inline-item><EnvironmentOutlined />HSR Layout, Bengaluru</li>
              <li list-inline-item><CalendarOutlined />Joined July 2022</li>
             
              </ul>
             
            </Card>

          </Col>

        </Row>


      </div>
    </>


  );
};

export default Profile