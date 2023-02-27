import React from "react";
import { Link } from "react-router-dom";
import { RightOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import * as types from "../../../services/actions/index";
import {
  addVaccine,
  deleteVaccine,
  getVaccine,
  updateVaccine,
} from "../../../services/useServices";

export default function Vaccine() {
  const vaccineDetail = useSelector((state) => state.VaccineDetail);
  const selectVaccine = useSelector((state) => state.SelectVaccine);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openAddDrawer, setOpenAddDrawer] = useState(false);
  const [vaccine, setVaccine] = useState([]);
  const [newVaccine, setNewVaccine] = useState({});
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
    dispatch(types.act_vaccine_detail(""));
  };
  const showAddDrawer = () => {
    setOpenAddDrawer(true);
  };
  const onCloseAdd = () => {
    setOpenAddDrawer(false);
  };

  function getData() {
    getVaccine().then((res) => {
      setVaccine(res.data);
    });
  }
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setNewVaccine(vaccineDetail);
  }, [vaccineDetail]);

  const handleCheck = (id) => {
    dispatch(types.act_select_vaccine(id));
    console.log(id);
  };

  const handleDelete = () => {
    console.log(selectVaccine);
    deleteVaccine(selectVaccine).then((err) => {
      getData();
      console.log(err);
    });
  };

  const handleAdd = () => {
    addVaccine({
      name: name,
      image: image,
      content: content,
    }).then((err) => {
      getData();
      console.log(err);
    });
    setName("");
    setImage("");
    setContent("");
  };

  const handleUpdate = () => {
    updateVaccine(vaccineDetail.id, newVaccine).then(() => {
      getData();
    });
  };

  let elementVaccine = vaccine ? (
    vaccine.map((data, index) => {
      return (
        <tr key={data.id} style={{ fontWeight: 400 }}>
          <th scope="row">
            <input
              type="checkbox"
              onChange={() => {
                handleCheck(data.id);
              }}
            />
          </th>
          <td className="tm-product-name">{index + 1}</td>
          <th className="tm-product-name">{data.name}</th>
          <td>{data.content}</td>
          <td>
            <Link
              onClick={() => {
                showDrawer();
                dispatch(types.act_vaccine_detail(data));
              }}
              className="tm-product-delete-link"
            >
              <RightOutlined />
            </Link>
          </td>
        </tr>
      );
    })
  ) : (
    <></>
  );
  let elementDrawer;
  elementDrawer =
    vaccineDetail != "" ? (
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
        <Form layout="vertical" hideRequiredMark initialValues={vaccineDetail}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter user name",
                  },
                ]}
              >
                <Input
                  placeholder="Please enter user name"
                  onChange={(e) => {
                    setNewVaccine({ ...newVaccine, name: e.target.value });
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="image"
                label="Image"
                rules={[
                  {
                    required: true,
                    message: "Please enter url",
                  },
                ]}
              >
                <Input
                  style={{
                    width: "100%",
                  }}
                  addonBefore="http://"
                  addonAfter=".com"
                  placeholder="Please enter url"
                  onChange={(e) => {
                    setNewVaccine({ ...newVaccine, image: e.target.value });
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="content"
                label="Content"
                rules={[
                  {
                    required: true,
                    message: "Please enter content",
                  },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Please enter content"
                  onChange={(e) => {
                    setNewVaccine({ ...newVaccine, content: e.target.value });
                  }}
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
                    <th scope="col">&nbsp;</th>
                    <th scope="col">No.</th>
                    <th scope="col">Name</th>
                    <th scope="col">Content</th>
                    <th scope="col">&nbsp;</th>
                  </tr>
                </thead>
                <tbody>{elementVaccine}</tbody>
              </table>
            </div>
            <a
              className="btn btn-primary btn-block text-uppercase mb-3"
              onClick={showAddDrawer}
            >
              Add Vaccine
            </a>
            <button
              className="btn btn-primary btn-block text-uppercase"
              onClick={handleDelete}
            >
              Delete Vaccine
            </button>
          </div>
        </div>
      </div>
      {elementDrawer}
      <Drawer
        title=""
        width={720}
        onClose={onCloseAdd}
        open={openAddDrawer}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onCloseAdd}>Cancel</Button>
            <Button
              onClick={() => {
                onCloseAdd();
                handleAdd();
              }}
              type="primary"
            >
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter vaccine name",
                  },
                ]}
              >
                <Input
                  placeholder="Please enter vaccine name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="image"
                label="Image"
                rules={[
                  {
                    required: true,
                    message: "Please enter url",
                  },
                ]}
              >
                <Input
                  style={{
                    width: "100%",
                  }}
                  addonBefore="http://"
                  addonAfter=".com"
                  placeholder="Please enter url"
                  onChange={(e) => {
                    setImage(e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: "Please enter content",
                  },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Please enter content..."
                  onChange={(e) => setContent(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </div>
  );
}
