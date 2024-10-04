import React from "react";
import { Typography, Layout } from "antd";
import "./Banner.css";

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
          {/* <Title className="title animate__animated animate__fadeIn" style={{ color: "white" }}>
            <span style={{textShadow: "0 0 10px #8d8093"}}>Добро пожаловать в</span> 
          </Title> */}
          <img
            className="animate__animated animate__fadeIn"
            style={{ width: "40%", marginTop: "50px" }}
            src="/img/LyricFileMaker.png"
            alt="lol"
          />
        </div>
      </Content>
    </Layout>
  );
};

export default Banner;
