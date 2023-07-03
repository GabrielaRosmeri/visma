import React from 'react';
import { ShoppingFilled, QuestionCircleFilled, BellFilled } from '@ant-design/icons';
import { Avatar, Badge, Col, Row, Layout, Menu, Space } from 'antd';

const { Header } = Layout;
const AppHeader = () => {
    return (
        <Header>
            <Row>
                <Col span={6} push={18}>
                    <Menu theme="dark" mode="horizontal">
                        <Menu.Item key="1"><ShoppingFilled style={{ fontSize: '16px', color: '#fff' }} /></Menu.Item>
                        <Menu.Item key="2"><QuestionCircleFilled style={{ fontSize: '16px', color: '#fff' }} /></Menu.Item>
                        <Menu.Item key="3"><Badge size="small" count={5}><BellFilled style={{ fontSize: '16px', color: '#fff' }} /></Badge></Menu.Item>
                        <Menu.Item key="4">
                            <Space>
                                <Avatar
                                    style={{
                                        backgroundColor: '#fde3cf',
                                        color: '#f56a00',
                                    }}
                                >
                                    A
                                </Avatar>
                            </Space>
                        </Menu.Item>
                    </Menu>
                </Col>
                <Col span={18} pull={6}>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1">Dashboard</Menu.Item>
                        <Menu.Item key="2">Organización</Menu.Item>
                        <Menu.Item key="3">Modelos</Menu.Item>
                        <Menu.Item key="4">Seguimiento</Menu.Item>
                    </Menu>
                </Col>
            </Row>
        </Header>
    );
};

export default AppHeader;
