import React from "react";
import styles from "./App.module.css";
import { Header, Footer, Carousel, SideMenu } from "./components";
import { Row, Col } from "antd";

const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.pageContent}>
        <Row
          style={{
            marginTop: 20,
          }}
        >
          <Col span={6}>
            <SideMenu />
          </Col>
          <Col span={18}>
            <Carousel />
          </Col>
        </Row>
      </div>
      <Footer />
    </div>
  );
};

export default App;
