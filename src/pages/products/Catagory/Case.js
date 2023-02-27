import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { RightOutlined } from "@ant-design/icons";
import { Button, Col, Drawer, Form, Input, Row, Select, Space } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import * as types from "../../../services/actions/index";
import { addCase, deleteCase, getCase, updateCase } from "../../../services/caseServices";

const { Option } = Select;

export default function Case() {
  const dispatch = useDispatch();
  const caseDetail = useSelector((state) => state.CaseDetail);
  const selectCase = useSelector((state) => state.SelectCase);
  const [listCase, setListCase] = useState([]);
  const [open, setOpen] = useState(false);
  const [openAddDrawer, setOpenAddDrawer] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [newCase, setNewCase] = useState({})
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateContent, setUpdateContent] = useState("");

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
    dispatch(types.act_case_detail(""));
  };
  const showAddDrawer = () => {
    setOpenAddDrawer(true);
  };
  const onCloseAdd = () => {
    setOpenAddDrawer(false);
  };

  function getData() {
    getCase().then((res) => {
      setListCase(res.data);
    });
  }
  useEffect(() => {
    getData();
  }, []);

  useEffect(()=>{
    setNewCase(caseDetail);
  },[caseDetail])

  const handleCheck = (id) => {
    dispatch(types.act_select_case(id));
  };

  const handleDelete = () => {
    deleteCase(selectCase).then((err) => {
      getData();
      console.log(err);
    });
  };

  const handleAdd = () => {
    // setNewData()
    addCase({
      title: title,
      content: content,
    }).then((err) => {
      getData();
      console.log(err);
    });
  };

  const handleUpdate = () => {
    updateCase(caseDetail.id, newCase).then(() => {
      getData();
    });
  };

  let elementCase = listCase ? listCase.map((data, index) => {
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
        <th className="tm-product-name">{data.title}</th>
        <td>{data.content}</td>
        <td>
          <Link
            onClick={() => {
              showDrawer();
              dispatch(types.act_case_detail(data));
            }}
            className="tm-product-delete-link"
          >
            <RightOutlined />
          </Link>
        </td>
      </tr>
    );
  }):<></>;

  let elementDrawer = caseDetail ? (
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
      <Form layout="vertical" hideRequiredMark initialValues={caseDetail}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="title"
              label="Title"
              rules={[
                {
                  required: true,
                  message: "Please enter case's title",
                },
              ]}
            >
              <Input
                placeholder="Please enter case's title"
                onChange={(e) => setNewCase({...newCase, title:e.target.value})}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="content"
              label="Content"
              rules={[
                {
                  required: true,
                  message: "Please enter case's content",
                },
              ]}
            >
              <Input
                placeholder="Please enter case's content"
                onChange={(e) => setNewCase({...newCase, content:e.target.value})}
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
                    <th scope="col">Title</th>
                    <th scope="col">Content</th>
                    <th scope="col">&nbsp;</th>
                  </tr>
                </thead>
                <tbody>{elementCase}</tbody>
              </table>
            </div>
            <a
              className="btn btn-primary btn-block text-uppercase mb-3"
              onClick={showAddDrawer}
            >
              Add Case
            </a>
            <button
              className="btn btn-primary btn-block text-uppercase"
              onClick={handleDelete}
            >
              Delete Case
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
                name="title"
                label="Title"
                rules={[
                  {
                    required: true,
                    message: "Please enter case's title",
                  },
                ]}
              >
                <Input
                  placeholder="Please enter case's title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="content"
                label="Content"
                rules={[
                  {
                    required: true,
                    message: "Please enter case's content",
                  },
                ]}
              >
                <Input
                  placeholder="Please enter case's title"
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
