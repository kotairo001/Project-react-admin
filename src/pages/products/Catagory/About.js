import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { RightOutlined } from "@ant-design/icons";
import { Button, Col, Drawer, Form, Input, Row, Select, Space } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import * as types from "../../../services/actions/index";
import { getAbout, updateAbout } from "../../../services/aboutServices";

const { Option } = Select;

export default function About() {
  const dispatch = useDispatch();
  const aboutDetail = useSelector((state) => state.AboutDetail);
  const [listAbout, setListAbout] = useState([]);
  const [open, setOpen] = useState(false);
  const [newAbout, setNewAbout] = useState({})
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateContent, setUpdateContent] = useState("");
  const [updateButton, setUpdateButton] = useState("");

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
    dispatch(types.act_about_detail(""));
  };

  function getData() {
    getAbout().then((res) => {
      setListAbout(res.data);
    });
  }
  useEffect(() => {
    getData();
  }, []);
  useEffect(()=>{
    setNewAbout(aboutDetail);
  },[aboutDetail])

  const handleUpdate = () => {
    updateAbout(aboutDetail.id, newAbout).then(() => {
      getData();
    });
  };

  let elementAbout = listAbout ? listAbout.map((data, index) => {
    return (
      <tr key={data.id} style={{ fontWeight: 400 }}>
        <td className="tm-product-name">{index + 1}</td>
        <td className="tm-product-name">{data.title}</td>
        <td className="tm-product-name">{data.content}</td>
        <td>{data.button}</td>
        <td>
          <Link
            onClick={() => {
              showDrawer();
              dispatch(types.act_about_detail(data));
            }}
            className="tm-product-delete-link"
          >
            <RightOutlined />
          </Link>
        </td>
      </tr>
    );
  }) :<></>;
// console.log(aboutDetail);
  let elementDrawer = aboutDetail ? (
    <Drawer
      title=""
      width={720}
      onClose={onClose}
      open={open}
      bodyStyle={{
        paddingBottom: 80,
      }}
      extra={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            onClick={() => {
              onClose();
              handleUpdate();
            }}
            type="primary"
            danger
          >
            Save
          </Button>
        </Space>
      }
    >
      <Form layout="vertical" hideRequiredMark initialValues={aboutDetail}>
        <Row gutter={16}>
        <Col span={24}>
            <Form.Item
              name="title"
              label="Title"
              rules={[
                {
                  required: true,
                  message: "Please enter about's title",
                },
              ]}
            >
              <Input
                placeholder="Please enter about's title"
                onChange={(e) => setNewAbout({...newAbout, title:e.target.value})}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="content"
              label="Content"
              rules={[
                {
                  required: true,
                  message: "Please enter about's content",
                },
              ]}
            >
              <Input.TextArea
                placeholder="Please enter about's content"
                onChange={(e) => setNewAbout({...newAbout, content:e.target.value})}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="button"
              label="Button"
              rules={[
                {
                  required: true,
                  message: "Please enter about's button",
                },
              ]}
            >
              <Input
                placeholder="Please enter about's button"
                onChange={(e) => setNewAbout({...newAbout, button:e.target.value})}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  ) : (
    <></>
  );
  return (
    <div className="container mt-5">
      <div className="row tm-content-row">
        <div className="col-sm-12 col-md-12 col-lg-8 col-xl-8 tm-block-col">
          <div className="tm-bg-primary-dark tm-block tm-block-products">
            <div className="tm-product-table-container">
              <table className="table table-hover tm-table-small tm-product-table">
                <thead>
                  <tr>
                    {/* <th scope="col">&nbsp;</th> */}
                    <th scope="col">No.</th>
                    <th scope="col">Title</th>
                    <th scope="col">Content</th>
                    <th scope="col">Button's Content</th>
                    <th scope="col">&nbsp;</th>
                  </tr>
                </thead>
                <tbody>{elementAbout}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {elementDrawer}
    </div>
  );
}
