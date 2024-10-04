import React from "react";
import { Typography, Layout } from "antd";
import "./Banner.css";

const { Title } = Typography;
const { Content } = Layout;

type BannerProps = {};

export const Banner: React.FC<BannerProps> = () => {
  return (
    <Layout className="gradient-background">
      <Content className="content">
        <div className="left">
          <img
            className="cloud"
            style={{opacity: 0.5}}
            src="/img/clouds.png"
            alt=""
          />
        </div>
        <div className="mid">
          <Title className="title animate__animated animate__fadeIn" style={{ color: "white" }}>
            Добро пожаловать в
          </Title>
          <img
            className="animate__animated animate__fadeIn"
            style={{ width: "40%" }}
            src="/img/LyricFileMaker.png"
            alt="lol"
          />
        </div>
      </Content>
    </Layout>
  );
};

export default Banner;
