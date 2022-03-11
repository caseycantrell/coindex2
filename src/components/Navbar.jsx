import { useState, useEffect } from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import { HomeOutlined, BulbOutlined, FundOutlined, MenuOutlined } from "@ant-design/icons";
import icon from "../images/cryptocurrency.png"

const Navbar = () => {

    const [activeMenu, setActiveMenu] = useState(true);
    const [screenSize, setScreenSize] = useState(null);

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    useEffect(() => {
        if (screenSize < 750) {
            setActiveMenu(false);
        } else {
            setActiveMenu(true);
        }
    }, [screenSize]);

  return (
    <div className="nav-container">
        <div className="logo-container">
            <Typography.Title level={2} className="logo">
                <Link style={{ color: "#fff" }} to="/">COINdex</Link>
            </Typography.Title>
            <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}>
                <MenuOutlined />
            </Button>
        </div>
        {activeMenu && (
            <Menu style={{ backgroundColor: "#000", border: "none" }}>
                <Menu.Item style={{ fontSize: "20px" }} icon={<HomeOutlined />} key={1}>
                    <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item style={{ fontSize: "20px" }} icon={<FundOutlined />} key={2}>
                    <Link to="/cryptocurrencies">Cryptocurrencies</Link>
                </Menu.Item>
                <Menu.Item style={{ fontSize: "20px" }} icon={<BulbOutlined />} key={4}>
                    <Link to="/news">News</Link>
                </Menu.Item>
            </Menu>
        )}
            
    </div>
  )
}

export default Navbar;