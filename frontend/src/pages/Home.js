import React from 'react';
import { Layout} from 'antd';
import AppHeader from '../components/Layout/Header';
import MainContent from '../components/Layout/MainContent';
const Home = () => {
    return (
        <Layout className="layout">
            <AppHeader />
            <MainContent />
        </Layout>
    );
};

export default Home;
