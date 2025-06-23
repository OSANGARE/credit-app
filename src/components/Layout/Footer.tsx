import React from 'react';
import { Layout, Row, Col, Typography, Divider } from 'antd';
import { 
  FacebookOutlined, 
  TwitterOutlined, 
  InstagramOutlined, 
  LinkedinOutlined 
} from '@ant-design/icons';
import './Footer.less';

const { Footer } = Layout;
const { Text, Link, Title } = Typography;

const AppFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Footer className="app-footer">
      <Row gutter={[40, 40]}>
        <Col xs={24} md={8}>
          <Title level={5} className="footer-title">CreditApp</Title>
          <Text className="footer-description">
            La solution simple et rapide pour vos demandes de crédit en ligne.
          </Text>
          <Divider className="footer-divider" />
          <Space size="middle" className="social-icons">
            <Link href="#"><FacebookOutlined /></Link>
            <Link href="#"><TwitterOutlined /></Link>
            <Link href="#"><InstagramOutlined /></Link>
            <Link href="#"><LinkedinOutlined /></Link>
          </Space>
        </Col>

        <Col xs={12} md={5}>
          <Title level={5} className="footer-title">Navigation</Title>
          <ul className="footer-links">
            <li><Link href="/">Accueil</Link></li>
            <li><Link href="/apply">Demander un crédit</Link></li>
            <li><Link href="/dashboard">Espace client</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
          </ul>
        </Col>

        <Col xs={12} md={5}>
          <Title level={5} className="footer-title">Légal</Title>
          <ul className="footer-links">
            <li><Link href="/privacy">Confidentialité</Link></li>
            <li><Link href="/terms">Conditions générales</Link></li>
            <li><Link href="/cookies">Cookies</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </Col>

        <Col xs={24} md={6}>
          <Title level={5} className="footer-title">Newsletter</Title>
          <Text>Abonnez-vous pour recevoir nos offres</Text>
          {/* Ici vous pourriez ajouter un composant de formulaire d'inscription */}
        </Col>
      </Row>

      <Divider className="footer-divider" />

      <Row justify="space-between" align="middle">
        <Col>
          <Text type="secondary">
            © {currentYear} CreditApp. Tous droits réservés.
          </Text>
        </Col>
        <Col>
          <Text type="secondary">Version 1.0.0</Text>
        </Col>
      </Row>
    </Footer>
  );
};

export default AppFooter;