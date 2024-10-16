import React from "react";
import { Button, Layout, Table, Typography } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./ComparsionTable.css";
import { useAppSelector } from "@/shared/hooks/reduxHooks";
import { ROUTES } from "@/app/router/routes";

const { Content } = Layout;

export const ComparisonTable: React.FC = () => {
  const {user} = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const dataSource = [
    {
      key: "1",
      feature: "Синхронизация текста",
      otherProducts: <CloseCircleOutlined style={{ color: "red" }} />,
      ourProduct: <CheckCircleOutlined style={{ color: "green" }} />,
    },
    {
      key: "2",
      feature: "Интерфейс",
      otherProducts: <CloseCircleOutlined style={{ color: "red" }} />,
      ourProduct: <CheckCircleOutlined style={{ color: "green" }} />,
    },
    {
      key: "3",
      feature: "Поддержка форматов",
      otherProducts: <CloseCircleOutlined style={{ color: "red" }} />,
      ourProduct: <CheckCircleOutlined style={{ color: "green" }} />,
    },
    {
      key: "4",
      feature: "Обновления",
      otherProducts: <CloseCircleOutlined style={{ color: "red" }} />,
      ourProduct: <CheckCircleOutlined style={{ color: "green" }} />,
    },
  ];

  const columns = [
    {
      title: "Функционал",
      dataIndex: "feature",
      key: "feature",
      render: (text: string) => (
        <Typography.Text style={{ color: "black" }}>{text}</Typography.Text>
      ),
    },
    {
      title: "Другие продукты",
      dataIndex: "otherProducts",
      key: "otherProducts",
    },
    {
      title: "Наш продукт",
      dataIndex: "ourProduct",
      key: "ourProduct",
    },
  ];

  const handleShowMore = async () => {
    user? navigate(ROUTES.CONSTRUCTOR) : navigate(ROUTES.SIGNIN);
  }

  return (
    <Layout
      className="comparison-container"
      style={{ padding: "20px" }}
    >
        <>
          <div
            style={{
              height: "1px",
              backgroundColor: "#001529",
              marginBottom: "60px",
            }}
          />
          <Content className="comparison-content">
            <Typography.Title level={2} style={{ color: "black" }}>
              Сравнение с другими продуктами
            </Typography.Title>
            <Table
              style={{ margin: "20px 0", color: "black" }}
              dataSource={dataSource}
              columns={columns}
              pagination={false}
              rowClassName="table-row"
              bordered
            />
            <div style={{ textAlign: "center", margin: "20px 0" }}>
              <Button type="primary" onClick={handleShowMore}>
                Попробуйте сами
              </Button>
            </div>
          </Content>
        </>
    </Layout>
  );
};
