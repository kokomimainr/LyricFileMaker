import React from "react";
import { Layout, Typography, Row, Col } from "antd";
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, GithubOutlined } from '@ant-design/icons';
import './AppFooter.css'; // Подключаем CSS файл

const { Footer } = Layout;

export const AppFooter: React.FC = () => {
  return (
    <Footer className="footer">
      <div className="footer-content">
        <Row justify="space-around">
          <Col span={8}>
            <Typography.Title level={5} style={{ color: 'white' }}>Контакты</Typography.Title>
            <Typography.Text style={{ color: 'white' }}>Email: juicypussy@AmAnTur04Ka.com</Typography.Text><br />
            <Typography.Text style={{ color: 'white' }}>Телефон: +7 (123) 456-78-90</Typography.Text>
          </Col>
          <Col style={{display: 'flex', alignItems: 'end', flexDirection: 'column'}} span={8}>
            <Typography.Title level={5} style={{ color: 'white' }}>Социальные сети</Typography.Title>
            <Row>
              <Col>
                <FacebookOutlined onClick={() => window.open('https://www.facebook.com/groups/510139854623229/')} style={{ fontSize: '20px', color: 'white', marginRight: '10px' }} />
              </Col>
              <Col>
                <TwitterOutlined onClick={() => window.open('https://twitter.com/FlopTropica_CEO')} style={{ fontSize: '20px', color: 'white', marginRight: '10px' }} />
              </Col>
              <Col>
                <InstagramOutlined onClick={() => window.open('https://www.instagram.com/wearefloptropica/')} style={{ fontSize: '20px', color: 'white', marginRight: '10px' }} />
              </Col>
              <Col>
              <GithubOutlined onClick={() => window.open('https://github.com/kokomimainr/LyricFileMaker')} style={{ fontSize: '20px', color: 'white' }}/>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Typography.Text style={{ color: 'white' }}>© 2024 LFM . Все права защищены.</Typography.Text>
      </div>
    </Footer>
  );
};
