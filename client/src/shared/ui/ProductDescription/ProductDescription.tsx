import React from "react";
import { Typography, Layout, Image, Flex } from "antd";
import "./ProductDescription.css";

const { Paragraph } = Typography;
const { Content } = Layout;

export const ProductDescription: React.FC = () => {
  return (
    <Layout className="description-container">
      <Content className="description-content" style={{ padding: "50px 0" }}>
        <Typography.Title level={2} className="description-title">
          Конструктор LRC <br />(Lyric File for Music)
        </Typography.Title>
        <Flex justify="center" align="center" gap={20}>
          <Image 
            src="/img/interface-1.png" 
            width={250} 
            style={{ objectFit: 'cover', margin: '10px 0', boxShadow: '0 5px 10px #8d8093' }} 
          />
          <Image 
            src="/img/interface-2.png" 
            width={250} 
            style={{ objectFit: 'cover', margin: '10px 0', boxShadow: '0 5px 10px #8d8093' }} 
          />
          <Image 
            src="/img/interface-3.png" 
            width={250} 
            style={{ objectFit: 'cover', margin: '10px 0', boxShadow: '0 5px 10px #8d8093' }} 
          />
        </Flex>
        <Paragraph className="description-text" style={{ marginTop: '60px' }}>
          Конструктор LRC упрощает жизнь, позволяя синхронизировать <span className="glowing-text">текст</span> песни с музыкой. Это делает прослушивание более увлекательным, помогает запоминать слова и создает атмосферу караоке, когда можно петь вместе с любимыми треками.
        </Paragraph>
      </Content>
    </Layout>
  );
};
