import React, { useEffect } from 'react';
import { Card, Table, Tag, Space, Typography, Spin, Alert } from 'antd';
import { useAppContext } from '../../context/AppContext';
import { CreditService } from '../../api/creditApi';
import { AuthService } from '../../auth/AuthService';
import { ApplicationStatus } from '../../types';
import { Link } from 'react-router-dom';
import './dashboard.less';

const { Title, Text } = Typography;

const Dashboard = () => {
  const { state, dispatch } = useAppContext();
  const { applications, user, isLoading } = state;

  useEffect(() => {
    const loadData = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      try {
        const [userData, apps] = await Promise.all([
          AuthService.getCurrentUser(),
          CreditService.getApplications()
        ]);
        
        dispatch({ type: 'SET_USER', payload: userData });
        dispatch({ type: 'SET_APPLICATIONS', payload: apps });
      } catch (error) {
        console.error('Erreur de chargement', error);
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    loadData();
  }, [dispatch]);

  const statusColors: Record<ApplicationStatus, string> = {
    pending: 'orange',
    approved: 'green',
    rejected: 'red'
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (id: string) => <Text copyable>{id.slice(0, 8)}...</Text>
    },
    {
      title: 'Montant',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `${amount.toLocaleString()} €`,
      sorter: (a: any, b: any) => a.amount - b.amount
    },
    {
      title: 'Durée',
      dataIndex: 'term',
      key: 'term',
      render: (term: number) => `${term} mois`
    },
    {
      title: 'Statut',
      dataIndex: 'status',
      key: 'status',
      render: (status: ApplicationStatus) => (
        <Tag color={statusColors[status]}>
          {status.toUpperCase()}
        </Tag>
      )
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString()
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Link to={`/applications/${record.id}`}>Détails</Link>
        </Space>
      )
    }
  ];

  if (isLoading && !applications.length) {
    return (
      <div className="loading-container">
        <Spin size="large" tip="Chargement de vos données..." />
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <Title level={2}>Espace Client</Title>
      
      {user && (
        <Card className="user-card">
          <div className="user-info">
            <Text strong>Bienvenue, {user.name}</Text>
            <Text type="secondary">{user.email}</Text>
          </div>
        </Card>
      )}

      <div className="applications-section">
        <div className="section-header">
          <Title level={4}>Vos demandes de crédit</Title>
          <Link to="/apply">
            <Button type="primary">Nouvelle demande</Button>
          </Link>
        </div>

        {applications.length === 0 ? (
          <Alert
            message="Aucune demande trouvée"
            description="Vous n'avez pas encore soumis de demande de crédit."
            type="info"
            showIcon
          />
        ) : (
          <Table
            columns={columns}
            dataSource={applications}
            rowKey="id"
            pagination={{ pageSize: 5 }}
            scroll={{ x: true }}
          />
        )}
      </div>

      <div className="quick-stats">
        <Card title="Statistiques">
          <Space size="large">
            <Statistic 
              title="En attente" 
              value={applications.filter(a => a.status === 'pending').length} 
            />
            <Statistic 
              title="Approuvées" 
              value={applications.filter(a => a.status === 'approved').length} 
              valueStyle={{ color: '#3f8600' }}
            />
            <Statistic 
              title="Rejetées" 
              value={applications.filter(a => a.status === 'rejected').length} 
              valueStyle={{ color: '#cf1322' }}
            />
          </Space>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;