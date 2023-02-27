import React from "react";
import { Link } from "react-router-dom";
import { RightOutlined } from "@ant-design/icons";
import { Button, Col, Drawer, Form, Input, Row, Space } from "antd";
import { useState, useEffect } from "react";
import {
  addNews,
  deleteNews,
  getNews,
  updateNews,
} from "../../../services/useServices";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import * as types from "../../../services/actions/index";

export default function News() {
  const newsDetail = useSelector((state) => state.NewsDetail);
  const selectNews = useSelector((state) => state.SelectNews);
  const [open, setOpen] = useState(false);
  const [openAddDrawer, setOpenAddDrawer] = useState(false);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [updatePost, setUpdatePost] = useState({});
  const [news, setNews] = useState([]);

  const dispatch = useDispatch();
  useEffect(()=>{
    setUpdatePost(newsDetail);
  },[newsDetail])
  
  const showDrawer = () => {
    setOpen(true);
  };
  const showAddDrawer = () => {
    setOpenAddDrawer(true);
  };
  const onClose = () => {
    setOpen(false);
    dispatch(types.act_news_detail(""));
  };
  const onCloseAdd = () => {
    setOpenAddDrawer(false);
  };


  function getData() {
    getNews().then((res) => {
      setNews(res.data);
    });
  }

  useEffect(() => {
    getData();
  }, []);

  const handleCheck = (id) => {
    dispatch(types.act_select_news(id));
  };

  const handleDelete = () => {
    deleteNews(selectNews).then((err) => {
      getData();
      console.log(err);
    });
  };

  const handleAdd = () => {
    // setNewData()
    addNews({
      title: title,
      summary: summary,
      content: content,
    }).then((err) => {
      getData();
      console.log(err);
    });
    setTitle("");
    setSummary("");
    setContent("");
  };

  const handleUpdate = () => {
    updateNews(newsDetail.id, updatePost).then(() => {
      getData();
    });
  };
  const elementNews = news ? news.map((data, index) => {
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
        <td>{data.summary}</td>
        <td>{data.content}</td>
        <td>
          <Link
            onClick={() => {
              showDrawer();
              dispatch(types.act_news_detail(data));
            }}
            className="tm-product-delete-link"
          >
            <RightOutlined />
          </Link>
        </td>
      </tr>
    );
  }):<></>;

  let elementDrawer = "";
  elementDrawer =
    newsDetail !== "" ? (
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
        <Form layout="vertical" hideRequiredMark initialValues={newsDetail}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="title"
                label="Title"
                rules={[
                  {
                    required: true,
                    message: "Please enter the title",
                  },
                ]}
              >
                <Input
                  placeholder="Please enter the title"
                  onChange={(e) => {
                    setUpdatePost({...updatePost, title: e.target.value});
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="summary"
                label="Summary"
                rules={[
                  {
                    required: true,
                    message: "Please enter summary",
                  },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Please enter summary"
                  onChange={(e) => {
                    setUpdatePost({...updatePost, summary: e.target.value});
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
                    setUpdatePost({...updatePost, content: e.target.value});
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
    <div className="container mt-5" style={{ marginLeft: "7%" }}>
      <div className="row tm-content-row">
        <div className="col-sm-12 col-md-12 col-lg-8 col-xl-8 tm-block-col">
          <div
            className="tm-bg-primary-dark tm-block tm-block-products"
            style={{ width: "1300px" }}
          >
            <div className="tm-product-table-container">
              <table
                className="table table-hover tm-table-small tm-product-table"
                style={{ fontSize: 15, fontWeight: 500 }}
              >
                <thead>
                  <tr>
                    <th scope="col">&nbsp;</th>
                    <th scope="col">No.</th>
                    <th scope="col">Title</th>
                    <th scope="col">Summary</th>
                    <th scope="col">Content</th>
                    <th scope="col">&nbsp;</th>
                  </tr>
                </thead>
                <tbody>{elementNews}</tbody>
              </table>
            </div>
            <button
              className="btn btn-primary btn-block text-uppercase mb-3"
              onClick={showAddDrawer}
            >
              Add News
            </button>
            <button
              className="btn btn-primary btn-block text-uppercase"
              onClick={handleDelete}
            >
              Delete News
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
            <Col span={24}>
              <Form.Item
                name="title"
                label="Title"
                rules={[
                  {
                    required: true,
                    message: "Please enter the title",
                  },
                ]}
              >
                <Input
                  placeholder="Please enter the title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="summary"
                label="Summary"
                rules={[
                  {
                    required: true,
                    message: "Please enter summary",
                  },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Please enter summary"
                  onChange={(e) => setSummary(e.target.value)}
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
                    setContent(e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </div>
  );
}
