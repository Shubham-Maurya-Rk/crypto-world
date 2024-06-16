import React, { useEffect,useState } from 'react';
import { Button, Avatar, Menu, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { MoneyCollectOutlined, HomeOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons';
import logo from '../images/cryptocurrency.png';

const Navbar = () => {
    const [screenSize, setscreenSize] = useState(null)
    const [activeMenu, setactiveMenu] = useState(true)
    useEffect(() => {
        const handleResize = () => setscreenSize(window.innerWidth)
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener('resize', handleResize)
    }, [])
    useEffect(() => {
        if (screenSize < 728) setactiveMenu(false)
        else setactiveMenu(true)
    }, [screenSize])

    return (
        <div className='nav-container'>
            <div className="logo-container">
                <Avatar src={logo} size="large" style={{ backgroundColor: "black" }} />
                <Typography.Title className='logo' level={2}>
                    <Link to="/">CrytoWorld</Link>
                </Typography.Title>
                <Button className='menu-control-container' onClick={() => setactiveMenu(!activeMenu)}><MenuOutlined /></Button>
            </div>
            {activeMenu && <Menu theme='dark'>
                <Menu.Item icon={<HomeOutlined />} key='Home'>
                    <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item icon={<FundOutlined />} key='Cryptocurrencies'>
                    <Link to="/cryptocurrencies">Cryptocurrencies</Link>
                </Menu.Item>
                <Menu.Item icon={<BulbOutlined />} key='News'>
                    <Link to="/news">News</Link>
                </Menu.Item>
            </Menu>}
        </div>
    )
}

export default Navbar
