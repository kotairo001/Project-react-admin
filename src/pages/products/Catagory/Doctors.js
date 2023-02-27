import React, { useEffect } from "react";
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
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import * as types from "../../../services/actions/index";
import {
  addHospital,
  deleteHospital,
  getHospital,
  updateHospital,
} from "../../../services/useServices";

const { Option } = Select;

export default function Doctors() {
  const dispatch = useDispatch();
  const hospitalDetail = useSelector((state) => state.HospitalDetail);
  const selectHospital = useSelector((state) => state.SelectHospital);
  const [listHospital, setListHospital] = useState([]);
  const [open, setOpen] = useState(false);
  const [openAddDrawer, setOpenAddDrawer] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [page, setPage] = useState("");
  const [newHospital, setNewHospital] = useState({})

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
    dispatch(types.act_hospital_detail(""));
  };
  const showAddDrawer = () => {
    setOpenAddDrawer(true);
  };
  const onCloseAdd = () => {
    setOpenAddDrawer(false);
  };

  function getData() {
    getHospital().then((res) => {
      setListHospital(res.data);
    });
  }
  useEffect(() => {
    getData();
  }, []);

  useEffect(()=>{
    setNewHospital(hospitalDetail);
  },[hospitalDetail])

  const handleCheck = (id) => {
    dispatch(types.act_select_hospital(id));
  };

  const handleDelete = () => {
    deleteHospital(selectHospital).then((err) => {
      getData();
      console.log(err);
    });
  };

  const handleAdd = () => {
    addHospital({
      name: name,
      address: address,
      phone: phone,
      email: email,
      page: page,
    }).then((err) => {
      getData();
      console.log(err);
    });
  };

  const handleUpdate = () => {
    updateHospital(hospitalDetail.id, newHospital).then(() => {
      getData();
    });
  };

  let elementHospital = listHospital ? (
    listHospital.map((data, index) => {
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
          <td>{data.address}</td>
          <td>{data.phone}</td>
          <td>{data.email}</td>
          <td>{data.page}</td>
          <td>
            <Link
              onClick={() => {
                showDrawer();
                dispatch(types.act_hospital_detail(data));
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

  let elementDrawer = hospitalDetail ? (
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
      <Form layout="vertical" hideRequiredMark initialValues={hospitalDetail}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Please enter hospital's name",
                },
              ]}
            >
              <Input
                placeholder="Please enter hospital's name"
                onChange={(e) => setNewHospital({...newHospital, name: e.target.value})}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="address"
              label="Address"
              rules={[
                {
                  required: true,
                  message: "Please enter hospital's address",
                },
              ]}
            >
              <Input
                placeholder="Please enter hospital's address"
                onChange={(e) => setNewHospital({...newHospital, address: e.target.value})}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="phone"
              label="Phone"
              rules={[
                {
                  required: true,
                  message: "Please select hospital's phone",
                },
              ]}
            >
              <Input
                placeholder="Please enter hospital's phone"
                onChange={(e) => setNewHospital({...newHospital, phone: e.target.value})}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Please choose hospital's email",
                },
              ]}
            >
              <Input
                placeholder="Please enter hospital's email"
                onChange={(e) => setNewHospital({...newHospital, email: e.target.value})}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="page"
              label="Homepage"
              rules={[
                {
                  required: true,
                  message: "Please enter hospital's homepage",
                },
              ]}
            >
              <Input
                placeholder="Please enter hospital's homepage"
                onChange={(e) => setNewHospital({...newHospital, page: e.target.value})}
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
                    <th scope="col">Address</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Email</th>
                    <th scope="col">Homepage</th>
                    <th scope="col">&nbsp;</th>
                  </tr>
                </thead>
                <tbody>{elementHospital}</tbody>
              </table>
            </div>
            <a
              className="btn btn-primary btn-block text-uppercase mb-3"
              onClick={showAddDrawer}
            >
              Add Hospital
            </a>
            <button
              className="btn btn-primary btn-block text-uppercase"
              onClick={handleDelete}
            >
              Delete Hospital
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
                    message: "Please enter hospital's name",
                  },
                ]}
              >
                <Input
                  placeholder="Please enter hospital's name"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="address"
                label="Address"
                rules={[
                  {
                    required: true,
                    message: "Please enter hospital's address",
                  },
                ]}
              >
                <Input
                  placeholder="Please enter hospital's address"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="Phone"
                rules={[
                  {
                    required: true,
                    message: "Please select hospital's phone",
                  },
                ]}
              >
                <Input
                  placeholder="Please enter hospital's phone"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: "Please choose hospital's email",
                  },
                ]}
              >
                <Input
                  placeholder="Please enter hospital's email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="home"
                label="Homepage"
                rules={[
                  {
                    required: true,
                    message: "please enter hospital's homepage",
                  },
                ]}
              >
                <Input
                  placeholder="please enter hospital's homepage"
                  onChange={(e) => setPage(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </div>
  );
}
