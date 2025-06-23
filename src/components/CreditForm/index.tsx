import React, { useState, useContext } from 'react';
import { Form, Input, Button, Select, Spin, notification } from 'antd';
import { CreditService } from '../../api/creditApi';
import { useAppContext } from '../../context/AppContext';

const { Option } = Select;

const CreditForm = () => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const { dispatch } = useAppContext();

  const handleSubmit = async (values) => {
    setSubmitting(true);
    const result = await CreditService.submitApplication({
      amount: values.amount,
      term: values.term,
      purpose: values.purpose,
      personalInfo: {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
      },
    });

    setSubmitting(false);

    if (result.success) {
      dispatch({
        type: 'ADD_APPLICATION',
        payload: {
          id: result.data.applicationId,
          amount: values.amount,
          term: values.term,
          status: 'pending',
          createdAt: new Date().toISOString(),
        },
      });

      notification.success({
        message: 'Succès',
        description: 'Votre demande a été soumise avec succès',
        duration: 10,
      });

      form.resetFields();
    } else {
      notification.error({
        message: 'Erreur',
        description: result.error || 'Échec de la soumission',
      });
    }
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Form.Item
        name="amount"
        label="Montant (€)"
        rules={[
          { required: true, message: 'Ce champ est obligatoire' },
          { type: 'number', min: 1000, max: 100000, transform: Number },
        ]}
      >
        <Input type="number" />
      </Form.Item>

      {/* Autres champs du formulaire... */}

      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={submitting}>
          {submitting ? <Spin size="small" /> : 'Soumettre'}
        </Button>
      </Form.Item>
    </Form>
  );
};