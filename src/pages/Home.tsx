import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Row, Col, Typography, Space, Alert } from 'antd';
import { useAppContext } from '../context/AppContext';
import { AuthService } from '../auth';
import { RecentApplications, CreditCalculator } from '../components';
import './Home.less';

const { Title, Text } = Typography;

const HomePage: React.FC = () => {
  const { state } = useAppContext();
  const navigate = useNavigate();
  const { user, applications } = state;

  const handleApplyClick = () => {
    if (user) {
      navigate('/apply');
    } else {
      AuthService.redirectToLogin();
    }
  };

  return (
    <div className="home-page">
      <div className="hero-section">
        <Title level={2}>Votre crédit en ligne, simple et rapide</Title>
        <Text type="secondary">
          Obtenez une réponse pré-approuvée en moins de 5 minutes
        </Text>
        
        <Space className="hero-actions" size="large">
          <Button 
            type="primary" 
            size="large"
            onClick={handleApplyClick}
          >
            Demander un crédit
          </Button>
          <Button size="large">En savoir plus</Button>
        </Space>
      </div>

      {user && applications.length > 0 && (
        <Alert
          message={`Vous avez ${applications.length} demande(s) en cours`}
          type="info"
          showIcon
          action={
            <Button 
              type="link" 
              size="small"
              onClick={() => navigate('/dashboard')}
            >
              Voir le détail
            </Button>
          }
          className="applications-alert"
        />
      )}

      <Row gutter={[24, 24]} className="features-section">
        <Col xs={24} md={12}>
          <Card title="Simulateur de crédit">
            <CreditCalculator />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Vos dernières demandes">
            <RecentApplications />
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]} className="info-cards">
        <Col xs={24} md={8}>
          <Card title="Taux avantageux">
            À partir de 1.9% TAEG*
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="Montant flexible">
            De 1 000€ à 100 000€
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="Réponse rapide">
            Sous 24h ouvrées
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;