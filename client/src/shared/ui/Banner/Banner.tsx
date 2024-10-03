import React from "react";
import { Button, Typography, Layout } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { Content } = Layout;

type BannerProps = {};

export const Banner: React.FC<BannerProps> = () => {
  const navigate = useNavigate();
  return (
    <Layout className="gradient-background">
      <Content
        className="content"
      >
        <Title className="title" style={{ color: "white" }}>
          Добро пожаловать в LyricFileMaker
        </Title>
        <Button
          className="button"
          type="primary"
          size="large"
          onClick={() => navigate("/signin")}
        >
          Перейти
        </Button>
      </Content>
    </Layout>
  );
};

export default Banner;
