import { Switch, Route, Link } from "react-router-dom";
import { Layout, Typography, Space } from "antd";
import { Navbar, Homepage, Cryptocurrencies, CryptoDetails, News } from "./components";
import "./App.css"
const { Title } = Typography;

function App() {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main"> 
          <Layout>
            <div className="routes">
              <Switch>
                <Route exact path="/">
                  <Homepage />
                </Route>
                <Route exact path="/cryptocurrencies">
                  <Cryptocurrencies />
                </Route>
                <Route exact path="/crypto/:coinId">
                  <CryptoDetails />
                </Route>
                <Route exact path="/news">
                  <News />
                </Route>
              </Switch>
            </div>
          </Layout>
        <div className="footer">
          <Title level={5} style={{ color: "white", textAlign: "center" }}>
            COINdex <br />
            All rights reserved
          </Title>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/news">News</Link>
          </Space>
          </div>
      </div>
    </div>
  );
}

export default App;
