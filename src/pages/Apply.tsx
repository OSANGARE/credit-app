import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Steps, message } from 'antd';
import { CreditForm, DocumentUpload, ReviewSubmit } from '../components';
import { useAppContext } from '../context/AppContext';
import { CreditService } from '../api';
import './Apply.less';

const { Step } = Steps;

const ApplyPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<any>(null);
  const [documents, setDocuments] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const { dispatch } = useAppContext();
  const navigate = useNavigate();

  const steps = [
    {
      title: 'Informations de base',
      content: <CreditForm onComplete={(data) => {
        setFormData(data);
        next();
      }} />,
    },
    {
      title: 'Documents',
      content: <DocumentUpload 
        documents={documents}
        onChange={setDocuments}
        onBack={prev}
        onNext={next}
      />,
    },
    {
      title: 'Validation',
      content: <ReviewSubmit 
        data={formData}
        documents={documents}
        onBack={prev}
        onSubmit={handleSubmit}
        loading={submitting}
      />,
    },
  ];

  const next = () => setCurrentStep(currentStep + 1);
  const prev = () => setCurrentStep(currentStep - 1);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const application = await CreditService.submitApplication({
        ...formData,
        documents,
      });
      
      dispatch({
        type: 'ADD_APPLICATION',
        payload: application,
      });
      
      message.success('Demande soumise avec succès!');
      navigate('/dashboard');
    } catch (error) {
      message.error('Erreur lors de la soumission');
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="apply-page">
      <Card title="Nouvelle demande de crédit" bordered={false}>
        <Steps current={currentStep} className="apply-steps">
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        
        <div className="steps-content">
          {steps[currentStep].content}
        </div>
      </Card>
    </div>
  );
};

export default ApplyPage;