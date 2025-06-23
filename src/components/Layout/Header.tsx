import React from 'react';
import { Layout, Menu, Button, Space, Avatar, Dropdown, Badge, Typography } from 'antd';
import { 
  HomeOutlined, 
  UserOutlined, 
  BellOutlined, 
  LogoutOutlined, 
  CreditCardOutlined 
} from '@ant-design/icons';
import { useAppContext } from '../../context/AppContext';
import { AuthService } from '../../auth/AuthService';
import { Link, useNavigate } from 'react-router-dom';
import './Header.less';

const { Header } = Layout;
const { Text } = Typography;

const AppHeader: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const { user } = state;
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout();
    dispatch({ type: 'SET_USER', payload: null });
    navigate('/login');
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        <Link to="/profile">Mon Profil</Link>
      </Menu.Item>
      <Menu.Item key="applications" icon={<CreditCardOutlined />}>
        <Link to="/dashboard">Mes Demandes</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item 
        key="logout" 
        icon={<LogoutOutlined />}
        onClick={handleLogout}
      >
        Déconnexion
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="app-header">
      <div className="logo">
        <Link to="/">
          <img src="/logo.svg" alt="CreditApp" height="40" />
        </Link>
      </div>

      <Menu 
        theme="dark" 
        mode="horizontal" 
        className="main-menu"
        selectedKeys={[location.pathname]}
      >
        <Menu.Item key="/" icon={<HomeOutlined />}>
          <Link to="/">Accueil</Link>
        </Menu.Item>
        <Menu.Item key="/apply">
          <Link to="/apply">Demander un crédit</Link>
        </Menu.Item>
        <Menu.Item key="/faq">
          <Link to="/faq">FAQ</Link>
        </Menu.Item>
      </Menu>

      <Space className="user-actions" size="middle">
        {user ? (
          <>
            <Badge count={5} className="notification-badge">
              <Button 
                type="text" 
                icon={<BellOutlined />} 
                className="notification-btn"
              />
            </Badge>
            
            <Dropdown overlay={userMenu} placement="bottomRight">
              <Space className="user-dropdown">
                <Avatar 
                  src={user.avatar} 
                  icon={<UserOutlined />} 
                  size="default"
                />
                <Text className="user-name">{user.name}</Text>
              </Space>
            </Dropdown>
          </>
        ) : (
          <Space>
            <Button onClick={() => navigate('/login')}>Connexion</Button>
            <Button 
              type="primary" 
              onClick={() => navigate('/register')}
            >
              Inscription
            </Button>
          </Space>
        )}
      </Space>
    </Header>
  );
};

export default AppHeader;